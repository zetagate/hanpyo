process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// WARNING: https://stackoverflow.com/questions/31673587/error-unable-to-verify-the-first-certificate-in-nodejs

const fs = require('fs');
const convert = require('xml-js');
const nodeFetch = require('node-fetch');
const tough = require('tough-cookie');
const cookie = new tough.CookieJar();
const fetch = require('fetch-cookie')(nodeFetch, cookie);

async function login(user_id, user_pwd) {
    const PORTAL_URL = 'https://portal.koreatech.ac.kr';
    user_id = encodeURIComponent(user_id);
    user_pwd = encodeURIComponent(user_pwd);
    await fetch(`${PORTAL_URL}/sso/sso_login.jsp`, {
        'body': `user_id=${user_id}&user_pwd=${user_pwd}&RelayState=%2Findex.jsp&id=PORTAL&targetId=PORTAL&user_password=${user_pwd}`,
        'method': 'POST',
    });
    await fetch(`${PORTAL_URL}/ktp/login/checkLoginId.do`, {
        'headers': {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        'body': `login_id=${user_id}&login_pwd=${user_pwd}&login_type=&login_empno=&login_certDn=&login_certChannel=`,
        'method': 'POST',
    });
    await fetch(`${PORTAL_URL}/ktp/login/checkSecondLoginCert.do`, {
        'body': `login_id=${user_id}`,
        'method': 'POST',
    });
    var manualRedirection = res => fetch(res.headers.get('location'), {
        'method': 'GET',
        redirect: 'manual'
    });
    cookie.setCookieSync('kut_login_type=id; Domain=koreatech.ac.kr; Path=/; hostOnly=false;', 'https://koreatech.ac.kr');
    await fetch(`${PORTAL_URL}/exsignon/sso/sso_assert.jsp`, {
        'body': 'certUserId=&certLoginId=&certEmpNo=&certType=&secondCert=&langKo=&langEn=',
        'method': 'POST',
        redirect: 'manual'
    }).then(manualRedirection).then(manualRedirection).then(manualRedirection).then(manualRedirection);
}

// view = 12, 14, 15
// year = 20xx
// term = 1학기:10, 여름학기:11, 2학기:20, 겨울학기:21
async function getLectureXML(view, year, term) {
    return await fetch('https://kut90.koreatech.ac.kr/nexacroController.do', {
        'body':
        `
<?xml version="1.0" encoding="UTF-8"?>
<Root xmlns="http://www.nexacroplatform.com/platform/dataset">
	<Parameters>
		<Parameter id="method">getList_sp</Parameter>
		<Parameter id="sqlid">NK_SOT_MST.NP_SELECT_${view}</Parameter>
	</Parameters>
	<Dataset id="input1">
		<ColumnInfo>
			<Column id="YR" type="string" size="4000" />
			<Column id="TERM_DIV" type="string" size="4000" />
		</ColumnInfo>
		<Rows>
			<Row>
				<Col id="YR">${year}</Col>
				<Col id="TERM_DIV">${term}</Col>
			</Row>
		</Rows>
	</Dataset>
</Root>
`.trim(),
        'method': 'POST'
    }).then(r => r.text());
}

function x2j(x) {
    return x.Root.Dataset.Rows.Row.map(r => r.Col.reduce((a, c) => (a[c._attributes.id] = c._text, a), {}));
}

const views = [12, 14, 15];
const options = {
    compact: true,
    spaces: 4
};

async function getLectureData(year, term) {
    let lectureData = await Promise.all(views.map(v => getLectureXML(v, year, term)));
    lectureData = lectureData.map(v => x2j(convert.xml2js(v, options))).flat();
    lectureData = lectureData.reduce((a, l) => {
        let k = l['CORS_CD'] + l['CLS_NO'];
        a[k] = {
            ...a[k],
            ...l
        };
        return a;
    }, {});
    return Object.values(lectureData);
}

const DAY_TIME = {
    "월": 0,
    "화": 100,
    "수": 200,
    "목": 300,
    "금": 400,
    "토": 500
};
const AB_TIME = {
    "A": 0,
    "B": 1
};
function splitLectureTM(str) {
    if (!str) {
        return [];
    }
    let output = [];
    let unit = str.split(',');
    for (let j = 0; j < unit.length; j++) {
        if (unit[j].length == 8) {
            let startStr = unit[j].substr(1, 3);
            let endStr = unit[j].substr(5, 3);
            let startTime = DAY_TIME[unit[j].charAt(0)] + 2 * (parseInt(startStr.substr(0, 2)) - 1) + AB_TIME[startStr.charAt(2)];
            let endTime = DAY_TIME[unit[j].charAt(0)] + 2 * (parseInt(endStr.substr(0, 2)) - 1) + AB_TIME[endStr.charAt(2)];

            for (let k = startTime; k <= endTime; k++) {
                output.push(k);
            }
        } else if (unit[j].length == 4) {
            let startStr = unit[j].substr(1, 3);
            let startTime = DAY_TIME[unit[j].charAt(0)] + 2 * (parseInt(startStr.substr(0, 2)) - 1) + AB_TIME[startStr.charAt(2)];
            output.push(startTime);
        } else {
            // console.log(subject);
        }
    }
    return output;
}

const JSD_FORMAT_KEYS = ['CORS_CD', 'CORS_NM', 'CLS_NO', 'REQ_DEPT_NM', 'LECT_RM', 'CREDIT', 'LECT_DES', 'DEPT_NM', 'PROF_NM', 'CLS_CNT', 'LECT_TMA'];
const TERMS = {10:'1학기', 11:'여름학기', 20:'2학기', 21:'겨울학기'};
!async function () {
    await login(process.env.KOREATECH_ID || process.argv[2], process.env.KOREATECH_PW || process.argv[3]);
    let year = new Date().getFullYear();
	let termsKey = Object.keys(TERMS);
    for (let term of termsKey) {
		let termKorean = TERMS[term];
        try {
            let ld = await getLectureData(year, term);
            fs.writeFileSync('latest.json', JSON.stringify(ld), 'utf8');
            ld.forEach(e => {
                e.LECT_TMA = splitLectureTM(e.LECT_TM);
                e.LECT_DES = e.LECT_HR ? e.LECT_HR.split('-').pop() : void 0;
            });
            ld = ld.map(e => JSD_FORMAT_KEYS.map(k => e[k]));
            ld = ld.map(e => e.map(v => v ? (typeof v === 'object' ? v : String(v)) : ''));
            fs.writeFileSync('latest.jsd', `var SUBJECT_DATA = \r\n${JSON.stringify(ld)};`, 'utf8');
            fs.writeFileSync('update.json', JSON.stringify({
                    updateTime: new Date(),
                    year,
					term: termKorean
                }), 'utf8');
			console.log(`${year}년 ${termKorean} 갱신 완료!`);
        } catch (e) {
			// console.error(e);
            break;
        }
    }
}
();