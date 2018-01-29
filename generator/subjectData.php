<?php
$data  = file_get_contents("subjectData.tsv");
$data2 = [];

foreach (explode("\n", $data) as $line) {
    if (!$line) continue;
    $arr = explode("\t", $line);

    /**
     * var D_COD = 0;
     * var D_KOR = 1;
     * var D_CRD = 2;
     * var D_CLS = 3;
     * var D_CAP = 4;
     * var D_DEP = 5;
     * var D_TAR = 6;
     * var D_PRO = 7;
     * var D_ENG = 8;
     * var D_DCR = 9;
     * var D_ELR = 10;
     * var D_TME = 11;
     */

    $code        = $arr[2];
    $name        = $arr[3];
    $credit      = $arr[5];
    $capacity    = $arr[9];
    $class       = $arr[8];
    $department  = $arr[11];
    $target      = $arr[33];
    $professor   = $arr[50];
    $isEnglish   = $arr[51];
    $isELearning = $arr[53];

    $timetable = [];

    for ($i = 0; $i < 16; ++$i) {
        $j = $i + 34;

        if (preg_match("@^([월화수목금토일])/([0-9]{2})([AB])$@u", trim($arr[$j]), $pregs)) {
            $timetable[] = str_replace(["월", "화", "수", "목", "금", "토", "일"], ["", 1, 2, 3, 4, 5, 6], $pregs[1]) . sprintf("%02d", ((substr($pregs[2], 1) - 1) * 2 + ($pregs[3] === "B" ? 1 : 0)));
        }
    }

    $item   = [];
    $item[] = $code;
    $item[] = $name;
    $item[] = $credit;
    $item[] = $class;
    $item[] = $capacity;
    $item[] = $department;
    $item[] = $target;
    $item[] = $professor;
    $item[] = $isEnglish;
    $item[] = $capacity;
    $item[] = $isELearning;
    $item[] = $timetable;

    $data2[] = $item;
}

file_put_contents("subjectData.js", json_encode($data2));