// ═══════════════════════════════════════════════════════
//  ch2.js – Chương 2: Ứng Suất Trong Đất
//  22 bài + 1 bài tổng hợp công thức
// ═══════════════════════════════════════════════════════

// ── Bảng tra nội bộ ──────────────────────────────────

// Bảng k0: hệ số ứng suất tâm hình chữ nhật
// k0 = f(l/b, z/b), tra theo hàng z/b, cột l/b
const _K0_LB = [1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.2,2.4,2.6,2.8,3,3.5,4,5,6,10];
const _K0_ZB = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.5];
const _K0_DATA = {
  // z/b: [k0 theo các l/b]
  0:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  0.1: [0.9943,0.995,0.9954,0.9958,0.996,0.9962,0.9963,0.9964,0.9965,0.9965,0.9966,0.9966,0.9967,0.9967,0.9967,0.9967,0.9967,0.9967,0.9968,0.9968,0.9968],
  0.2: [0.9604,0.9648,0.9678,0.97,0.9717,0.9728,0.9737,0.9744,0.975,0.9754,0.9757,0.9762,0.9765,0.9767,0.9768,0.9769,0.9771,0.9772,0.9772,0.9773,0.9773],
  0.3: [0.8916,0.9022,0.9101,0.9159,0.9202,0.9236,0.9261,0.9281,0.9296,0.9309,0.9318,0.9333,0.9342,0.9349,0.9354,0.9357,0.9362,0.9364,0.9367,0.9367,0.9368],
  0.4: [0.7997,0.8169,0.83,0.8401,0.848,0.8541,0.8589,0.8628,0.8658,0.8683,0.8703,0.8733,0.8753,0.8767,0.8777,0.8784,0.8796,0.8801,0.8806,0.8808,0.881],
  0.5: [0.7009,0.7228,0.7403,0.7543,0.7656,0.7746,0.7819,0.7878,0.7926,0.7965,0.7998,0.8047,0.8081,0.8106,0.8123,0.8136,0.8156,0.8167,0.8176,0.818,0.8183],
  0.6: [0.6064,0.631,0.6514,0.6682,0.6821,0.6935,0.703,0.7108,0.7174,0.7228,0.7274,0.7344,0.7395,0.7431,0.7458,0.7478,0.751,0.7527,0.7542,0.7548,0.7553],
  0.7: [0.522,0.5475,0.5692,0.5876,0.6032,0.6164,0.6276,0.637,0.645,0.6518,0.6576,0.6667,0.6734,0.6784,0.6821,0.6849,0.6894,0.6919,0.6942,0.6951,0.6958],
  0.8: [0.4492,0.4743,0.4962,0.5153,0.5317,0.546,0.5583,0.5689,0.578,0.5859,0.5927,0.6037,0.6119,0.6182,0.6229,0.6266,0.6326,0.6359,0.6391,0.6404,0.6416],
  0.9: [0.3877,0.4117,0.433,0.4519,0.4686,0.4833,0.4962,0.5075,0.5174,0.5261,0.5337,0.5462,0.5558,0.5632,0.5689,0.5735,0.581,0.5853,0.5895,0.5913,0.5928],
  1:   [0.3361,0.3586,0.3789,0.3972,0.4136,0.4283,0.4414,0.453,0.4634,0.4726,0.4807,0.4943,0.505,0.5135,0.5201,0.5254,0.5345,0.5398,0.5451,0.5474,0.5495],
  1.1: [0.2929,0.3138,0.3328,0.3503,0.3661,0.3804,0.3934,0.4051,0.4156,0.425,0.4335,0.4479,0.4594,0.4687,0.4762,0.4822,0.4927,0.499,0.5055,0.5083,0.511],
  1.2: [0.2568,0.2759,0.2937,0.3101,0.3251,0.339,0.3516,0.3631,0.3735,0.383,0.3916,0.4065,0.4186,0.4285,0.4366,0.4432,0.455,0.4623,0.47,0.4734,0.4768],
  1.3: [0.2264,0.244,0.2604,0.2757,0.2899,0.303,0.3152,0.3263,0.3366,0.346,0.3546,0.3696,0.3821,0.3925,0.401,0.4082,0.4211,0.4293,0.4382,0.4423,0.4463],
  1.4: [0.2007,0.2168,0.232,0.2462,0.2595,0.2719,0.2835,0.2942,0.3042,0.3134,0.3218,0.3368,0.3495,0.3601,0.3691,0.3766,0.3905,0.3996,0.4096,0.4143,0.4191],
  1.5: [0.1789,0.1936,0.2076,0.2208,0.2332,0.2449,0.2559,0.2661,0.2757,0.2846,0.2929,0.3076,0.3203,0.3311,0.3402,0.348,0.3628,0.3726,0.3837,0.3891,0.3947],
  1.6: [0.1603,0.1738,0.1867,0.1989,0.2105,0.2214,0.2318,0.2415,0.2507,0.2592,0.2672,0.2816,0.2942,0.305,0.3143,0.3223,0.3376,0.3481,0.3602,0.3662,0.3727],
  1.7: [0.1443,0.1567,0.1685,0.1799,0.1907,0.2009,0.2107,0.2199,0.2286,0.2368,0.2445,0.2585,0.2708,0.2815,0.2908,0.2989,0.3147,0.3257,0.3388,0.3455,0.3529],
  1.8: [0.1305,0.1419,0.1528,0.1633,0.1734,0.183,0.1921,0.2008,0.209,0.2168,0.2242,0.2378,0.2498,0.2603,0.2696,0.2777,0.2939,0.3053,0.3193,0.3265,0.3349],
  1.9: [0.1185,0.129,0.1391,0.1488,0.1582,0.1671,0.1757,0.1839,0.1917,0.1992,0.2062,0.2192,0.2309,0.2412,0.2504,0.2577,0.2748,0.2866,0.3013,0.3091,0.3184],
  2:   [0.1081,0.1177,0.1271,0.1361,0.1448,0.1532,0.1612,0.169,0.1764,0.1834,0.1901,0.2026,0.2139,0.224,0.233,0.2415,0.2574,0.2694,0.2848,0.2932,0.3034],
  2.2: [0.0908,0.0991,0.1071,0.1149,0.1225,0.1299,0.1369,0.1438,0.1504,0.1567,0.1628,0.1742,0.1847,0.1942,0.2028,0.2114,0.2267,0.2391,0.2554,0.2648,0.2768],
  2.4: [0.0773,0.0844,0.0914,0.0982,0.1048,0.1113,0.1176,0.1236,0.1295,0.1352,0.1407,0.1511,0.1607,0.1695,0.1776,0.1857,0.2008,0.2132,0.2302,0.2403,0.2542],
  2.6: [0.0665,0.0727,0.0788,0.0848,0.0906,0.0963,0.1019,0.1073,0.1125,0.1176,0.1226,0.132,0.1408,0.149,0.1566,0.1643,0.1788,0.191,0.2083,0.2191,0.2345],
  2.8: [0.0578,0.0633,0.0686,0.0739,0.079,0.0841,0.089,0.0939,0.0986,0.1032,0.1076,0.1162,0.1243,0.1318,0.1389,0.1464,0.16,0.1718,0.1892,0.2004,0.2174],
  3:   [0.0507,0.0555,0.0603,0.0649,0.0695,0.074,0.0784,0.0828,0.087,0.0911,0.0952,0.103,0.1104,0.1173,0.1239,0.1312,0.1438,0.1552,0.1724,0.1839,0.2022],
  3.2: [0.0448,0.0491,0.0533,0.0575,0.0616,0.0656,0.0696,0.0735,0.0773,0.081,0.0847,0.0918,0.0986,0.105,0.1111,0.1173,0.1298,0.1407,0.1577,0.1693,0.1888],
  3.4: [0.0399,0.0437,0.0475,0.0512,0.0549,0.0585,0.0621,0.0656,0.0691,0.0725,0.0758,0.0823,0.0885,0.0944,0.1001,0.1058,0.1176,0.1281,0.1446,0.1563,0.1767],
  3.6: [0.0357,0.0391,0.0425,0.0459,0.0492,0.0525,0.0558,0.059,0.0621,0.0652,0.0682,0.0742,0.0798,0.0853,0.0905,0.0957,0.107,0.117,0.133,0.1446,0.1658],
  3.8: [0.0321,0.0352,0.0383,0.0414,0.0444,0.0474,0.0503,0.0532,0.0561,0.0589,0.0617,0.0671,0.0724,0.0774,0.0823,0.0871,0.0977,0.1071,0.1226,0.1341,0.1559],
  4:   [0.0291,0.0319,0.0347,0.0375,0.0402,0.0429,0.0456,0.0483,0.0509,0.0535,0.0561,0.061,0.0659,0.0706,0.0751,0.0796,0.0895,0.0984,0.1133,0.1246,0.1469],
  4.5: [0.0231,0.0254,0.0276,0.0298,0.032,0.0342,0.0364,0.0385,0.0407,0.0428,0.0449,0.0489,0.0529,0.0568,0.0606,0.0643,0.0728,0.0807,0.0941,0.1047,0.1276],
};

// Bảng kc: hệ số ứng suất GÓC hình chữ nhật
// kc = f(l/b, z/b) — dùng cùng l/b headers, z/b rows như k0
const _KC_DATA = {
  0:   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  0.1: [0.9943,0.995,0.9954,0.9958,0.996,0.9962,0.9963,0.9964,0.9965,0.9965,0.9966,0.9966,0.9967,0.9967,0.9967,0.9967,0.9967,0.9967,0.9968,0.9968,0.9968],
  0.2: [0.9604,0.9648,0.9678,0.97,0.9717,0.9728,0.9737,0.9744,0.975,0.9754,0.9757,0.9762,0.9765,0.9767,0.9768,0.9769,0.9771,0.9772,0.9772,0.9773,0.9773],
  0.3: [0.8916,0.9022,0.9101,0.9159,0.9202,0.9236,0.9261,0.9281,0.9296,0.9309,0.9318,0.9333,0.9342,0.9349,0.9354,0.9357,0.9362,0.9364,0.9367,0.9367,0.9368],
  0.4: [0.7997,0.8169,0.83,0.8401,0.848,0.8541,0.8589,0.8628,0.8658,0.8683,0.8703,0.8733,0.8753,0.8767,0.8777,0.8784,0.8796,0.8801,0.8806,0.8808,0.881],
  0.5: [0.7009,0.7228,0.7403,0.7543,0.7656,0.7746,0.7819,0.7878,0.7926,0.7965,0.7998,0.8047,0.8081,0.8106,0.8123,0.8136,0.8156,0.8167,0.8176,0.818,0.8183],
  0.6: [0.6064,0.631,0.6514,0.6682,0.6821,0.6935,0.703,0.7108,0.7174,0.7228,0.7274,0.7344,0.7395,0.7431,0.7458,0.7478,0.751,0.7527,0.7542,0.7548,0.7553],
  0.7: [0.522,0.5475,0.5692,0.5876,0.6032,0.6164,0.6276,0.637,0.645,0.6518,0.6576,0.6667,0.6734,0.6784,0.6821,0.6849,0.6894,0.6919,0.6942,0.6951,0.6958],
  0.8: [0.4492,0.4743,0.4962,0.5153,0.5317,0.546,0.5583,0.5689,0.578,0.5859,0.5927,0.6037,0.6119,0.6182,0.6229,0.6266,0.6326,0.6359,0.6391,0.6404,0.6416],
  0.9: [0.3877,0.4117,0.433,0.4519,0.4686,0.4833,0.4962,0.5075,0.5174,0.5261,0.5337,0.5462,0.5558,0.5632,0.5689,0.5735,0.581,0.5853,0.5895,0.5913,0.5928],
  1:   [0.2929,0.3138,0.3328,0.3503,0.3661,0.3804,0.3934,0.4051,0.4156,0.425,0.4335,0.4479,0.4594,0.4687,0.4762,0.4822,0.4927,0.499,0.5055,0.5083,0.511],
  1.25:[0.2045,0.224,0.2412,0.258,0.2733,0.2878,0.3013,0.3139,0.3256,0.3363,0.3462,0.3641,0.3796,0.3932,0.4051,0.4155,0.4349,0.4489,0.4658,0.4738,0.4834],
  1.5: [0.1507,0.167,0.1826,0.1975,0.2116,0.2248,0.2373,0.2489,0.2597,0.2699,0.2794,0.2966,0.3118,0.3254,0.3375,0.3483,0.3687,0.3841,0.4033,0.4129,0.4248],
  1.75:[0.1159,0.1295,0.1427,0.155,0.1666,0.1775,0.1878,0.1975,0.2066,0.2151,0.2232,0.2379,0.2514,0.2637,0.2749,0.2851,0.305,0.3203,0.3402,0.3503,0.3627],
  2:   [0.0908,0.1024,0.1134,0.1238,0.1337,0.1431,0.1521,0.1606,0.1687,0.1764,0.1836,0.1969,0.2091,0.2203,0.2306,0.2401,0.259,0.2742,0.2944,0.3047,0.3175],
  3:   [0.0407,0.047,0.0532,0.0591,0.065,0.0706,0.0761,0.0814,0.0866,0.0915,0.0962,0.1052,0.1136,0.1215,0.129,0.1361,0.1513,0.1645,0.1847,0.1949,0.208],
  4:   [0.0231,0.0271,0.031,0.035,0.0389,0.0428,0.0466,0.0503,0.054,0.0576,0.0611,0.0679,0.0744,0.0807,0.0867,0.0926,0.1057,0.1174,0.1373,0.1478,0.162],
};

// Bảng kz tại điểm bất kỳ dưới tải hình băng (Flamant)
// kz = f(x/b, z/b)
const _KZ_XB = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];
const _KZ_ZB = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5,1.75,2,3,4,5,10,20];
const _KZ_DATA = [
  [0.9968,0.9960,0.9925,0.9793,0.9089,0.4998,0.0112,0.0016,0.0005,0.0002,0.0000,0.0000],
  [0.9773,0.9728,0.9552,0.9061,0.7727,0.4984,0.0587,0.0109,0.0034,0.0014,0.0004,0.0000],
  [0.9368,0.9277,0.8955,0.8245,0.6910,0.4948,0.1196,0.0300,0.0103,0.0045,0.0013,0.0002],
  [0.8810,0.8689,0.8295,0.7546,0.6379,0.4886,0.1729,0.0558,0.0214,0.0097,0.0029,0.0005],
  [0.8183,0.8055,0.7656,0.6961,0.5978,0.4797,0.2137,0.0839,0.0358,0.0172,0.0053,0.0010],
  [0.7554,0.7432,0.7066,0.6459,0.5639,0.4684,0.2431,0.1110,0.0520,0.0264,0.0086,0.0017],
  [0.6960,0.6852,0.6533,0.6016,0.5336,0.4551,0.2632,0.1350,0.0689,0.0369,0.0127,0.0026],
  [0.6417,0.6325,0.6054,0.5620,0.5055,0.4405,0.2763,0.1553,0.0853,0.0481,0.0176,0.0038],
  [0.5931,0.5853,0.5626,0.5264,0.4793,0.4250,0.2840,0.1719,0.1006,0.0595,0.0230,0.0052],
  [0.5498,0.5433,0.5243,0.4941,0.4548,0.4092,0.2876,0.1848,0.1142,0.0706,0.0289,0.0069],
  [0.4618,0.4576,0.4454,0.4259,0.4003,0.3700,0.2851,0.2045,0.1407,0.0952,0.0443,0.0119],
  [0.3958,0.3931,0.3850,0.3720,0.3548,0.3341,0.2735,0.2112,0.1568,0.1139,0.0593,0.0180],
  [0.3453,0.3435,0.3379,0.3290,0.3170,0.3024,0.2583,0.2102,0.1650,0.1266,0.0723,0.0246],
  [0.3058,0.3044,0.3005,0.2941,0.2855,0.2749,0.2421,0.2047,0.1677,0.1342,0.0829,0.0314],
  [0.2084,0.2079,0.2066,0.2045,0.2016,0.1979,0.1859,0.1707,0.1538,0.1362,0.1028,0.0540],
  [0.1575,0.1573,0.1568,0.1558,0.1545,0.1529,0.1473,0.1401,0.1315,0.1220,0.1020,0.0657],
  [0.1265,0.1264,0.1261,0.1256,0.1249,0.1240,0.1211,0.1171,0.1123,0.1068,0.0945,0.0690],
  [0.0636,0.0635,0.0635,0.0634,0.0634,0.0632,0.0629,0.0623,0.0616,0.0608,0.0588,0.0535],
  [0.0318,0.0318,0.0318,0.0318,0.0318,0.0318,0.0317,0.0317,0.0316,0.0315,0.0312,0.0304],
];

// Bảng kx dưới tải hình băng
const _KX_DATA = [
  [0.7519,0.7429,0.7124,0.6463,0.5207,0.4368,0.1802,0.0817,0.0476,0.0315,0.0169,0.0073],
  [0.5382,0.5272,0.4933,0.4380,0.3832,0.3760,0.2699,0.1470,0.0901,0.0608,0.0332,0.0144],
  [0.3751,0.3675,0.3467,0.3214,0.3090,0.3196,0.2882,0.1884,0.1238,0.0863,0.0484,0.0214],
  [0.2599,0.2568,0.2497,0.2454,0.2518,0.2691,0.2743,0.2079,0.1475,0.1068,0.0620,0.0280],
  [0.1817,0.1818,0.1836,0.1905,0.2051,0.2251,0.2489,0.2112,0.1614,0.1220,0.0739,0.0343],
  [0.1292,0.1311,0.1374,0.1493,0.1669,0.1875,0.2207,0.2045,0.1673,0.1321,0.0837,0.0402],
  [0.0938,0.0964,0.1045,0.1179,0.1359,0.1561,0.1934,0.1922,0.1669,0.1375,0.0914,0.0455],
  [0.0695,0.0723,0.0806,0.0939,0.1111,0.1300,0.1685,0.1771,0.1622,0.1392,0.0971,0.0503],
  [0.0526,0.0552,0.0631,0.0754,0.0911,0.1085,0.1463,0.1613,0.1547,0.1378,0.1010,0.0545],
  [0.0405,0.0429,0.0500,0.0611,0.0752,0.0908,0.1269,0.1457,0.1456,0.1342,0.1032,0.0582],
  [0.0253,0.0272,0.0326,0.0412,0.0522,0.0646,0.0956,0.1173,0.1255,0.1230,0.1034,0.0638],
  [0.0138,0.0151,0.0186,0.0243,0.0317,0.0403,0.0636,0.0839,0.0969,0.1021,0.0967,0.0683],
  [null,null,null,null,null,null,null,null,null,null,null,null], // z/b=1.75 skip
  [0.0062,0.0068,0.0086,0.0116,0.0155,0.0203,0.0343,0.0490,0.0615,0.0706,0.0779,0.0677],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
];

// Bảng kt (τxz) dưới tải hình băng
const _KT_DATA = [
  [0,0.0101,0.0255,0.0588,0.1553,0.3152,0.0419,0.0108,0.0045,0.0024,0.0009,0.0002],
  [0,0.0318,0.0739,0.1404,0.2397,0.3061,0.1163,0.0383,0.0170,0.0091,0.0035,0.0010],
  [0,0.0509,0.1098,0.1811,0.2546,0.2920,0.1705,0.0720,0.0348,0.0193,0.0077,0.0022],
  [0,0.0612,0.1254,0.1910,0.2471,0.2744,0.1993,0.1031,0.0547,0.0317,0.0132,0.0038],
  [0,0.0636,0.1265,0.1850,0.2310,0.2546,0.2107,0.1273,0.0739,0.0449,0.0196,0.0059],
  [0,0.0612,0.1198,0.1719,0.2118,0.2341,0.2116,0.1440,0.0907,0.0580,0.0266,0.0082],
  [0,0.0565,0.1098,0.1563,0.1920,0.2136,0.2063,0.1538,0.1043,0.0699,0.0338,0.0109],
  [0,0.0509,0.0988,0.1404,0.1729,0.1941,0.1975,0.1584,0.1144,0.0803,0.0409,0.0138],
  [0,0.0454,0.0881,0.1255,0.1553,0.1759,0.1868,0.1590,0.1213,0.0888,0.0477,0.0168],
  [0,0.0404,0.0784,0.1120,0.1393,0.1592,0.1754,0.1567,0.1254,0.0955,0.0540,0.0199],
  [0,0.0300,0.0587,0.0845,0.1067,0.1242,0.1469,0.1440,0.1265,0.1047,0.0668,0.0277],
  [0,0.0228,0.0447,0.0649,0.0829,0.0979,0.1219,0.1273,0.1198,0.1058,0.0749,0.0349],
  [0,0.0177,0.0348,0.0509,0.0655,0.0784,0.1012,0.1108,0.1098,0.1019,0.0788,0.0410],
  [0,0.0140,0.0277,0.0408,0.0528,0.0637,0.0845,0.0959,0.0988,0.0955,0.0795,0.0459],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null,null,null,null,null],
];

// ── Hàm nội suy 2D ────────────────────────────────────
function _interp1D(xs, ys, x) {
  if (x <= xs[0]) return ys[0];
  if (x >= xs[xs.length-1]) return ys[ys.length-1];
  for (let i = 0; i < xs.length-1; i++) {
    if (x >= xs[i] && x <= xs[i+1]) {
      const t = (x - xs[i]) / (xs[i+1] - xs[i]);
      return ys[i] + t * (ys[i+1] - ys[i]);
    }
  }
  return ys[ys.length-1];
}

function lookupK0(lb, zb) {
  const lbKeys = _K0_LB;
  const zbKeys = _K0_ZB;
  const zbVals = zbKeys.map(z => {
    const row = _K0_DATA[z];
    if (!row) return null;
    return _interp1D(lbKeys, row, lb);
  }).filter((v,i) => v !== null && zbKeys[i] !== undefined);
  const zbFiltered = zbKeys.filter(z => _K0_DATA[z]);
  return _interp1D(zbFiltered, zbVals, zb);
}

function lookupKz(xb, zb) {
  const zbIdx = _KZ_ZB;
  const vals = zbIdx.map((z, i) => {
    const row = _KZ_DATA[i];
    if (!row) return null;
    return _interp1D(_KZ_XB, row, xb);
  });
  return _interp1D(zbIdx, vals, zb);
}

function lookupKx(xb, zb) {
  const zbVals = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.2,1.5,2];
  const idxMap = [0,1,2,3,4,5,6,7,8,9,11,13];
  const vals = idxMap.map((i) => {
    const row = _KX_DATA[i];
    if (!row || row[0] === null) return null;
    return _interp1D(_KZ_XB, row, xb);
  }).filter(v => v !== null);
  const zbF = zbVals.slice(0, vals.length);
  return _interp1D(zbF, vals, zb);
}

function lookupKt(xb, zb) {
  const zbVals = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5,1.75,2];
  const vals = zbVals.map((z, i) => {
    const row = _KT_DATA[i];
    if (!row || row[0] === null) return null;
    return _interp1D(_KZ_XB, row, xb);
  }).filter(v => v !== null);
  const zbF = zbVals.slice(0, vals.length);
  return _interp1D(zbF, vals, zb);
}

// ── SVG helpers ───────────────────────────────────────
function svgLayer2(h1,h2,g1,g2,label1,label2) {
  return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="220" fill="#f8faff"/>
  <!-- Lớp 1 -->
  <rect x="30" y="10" width="240" height="90" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="50" y="58" font-family="sans-serif" font-size="12" fill="#5a3a1a">γ₁ = ${g1} kN/m³</text>
  <text x="50" y="75" font-family="sans-serif" font-size="11" fill="#5a3a1a">${label1}</text>
  <!-- Lớp 2 -->
  <rect x="30" y="100" width="240" height="110" fill="#b0c8e8" stroke="#4a7ab5" stroke-width="1.5"/>
  <text x="50" y="150" font-family="sans-serif" font-size="12" fill="#1a3a6c">γ₂ = ${g2} kN/m³</text>
  <text x="50" y="167" font-family="sans-serif" font-size="11" fill="#1a3a6c">${label2}</text>
  <!-- Mũi tên h1 -->
  <line x1="15" y1="10" x2="15" y2="100" stroke="#333" stroke-width="1.5" marker-end="url(#arr)" marker-start="url(#arr2)"/>
  <text x="2" y="60" font-family="sans-serif" font-size="10" fill="#333">h₁=${h1}m</text>
  <!-- Mũi tên h2 -->
  <line x1="280" y1="100" x2="280" y2="210" stroke="#333" stroke-width="1.5" marker-end="url(#arr)" marker-start="url(#arr2)"/>
  <text x="265" y="160" font-family="sans-serif" font-size="10" fill="#333">h₂=∞</text>
  <defs>
    <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#333"/></marker>
    <marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0,0 L6,3 L0,6 Z" fill="#333"/></marker>
  </defs>
</svg>`;
}

function svgLayer2MNN(h1,hnn,g1,g2,gdn) {
  const nnY = 10 + (hnn/Math.max(h1*2,6))*180;
  return `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="230" fill="#f8faff"/>
  <!-- Lớp 1 -->
  <rect x="30" y="10" width="240" height="90" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="50" y="52" font-family="sans-serif" font-size="12" fill="#5a3a1a">γ₁=${g1} kN/m³</text>
  <text x="50" y="68" font-family="sans-serif" font-size="11" fill="#5a3a1a">h₁=${h1}m</text>
  <!-- MNN -->
  <line x1="30" y1="${nnY+60}" x2="270" y2="${nnY+60}" stroke="#1e88e5" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="35" y="${nnY+55}" font-family="sans-serif" font-size="10" fill="#1e88e5">▼ MNN</text>
  <!-- Lớp 2 bão hòa -->
  <rect x="30" y="100" width="240" height="120" fill="#7ec8e3" stroke="#1e88e5" stroke-width="1.5" opacity="0.7"/>
  <text x="50" y="150" font-family="sans-serif" font-size="12" fill="#0d47a1">γ=${g2} / γ_dn=${gdn} kN/m³</text>
  <text x="50" y="168" font-family="sans-serif" font-size="11" fill="#0d47a1">Bão hòa</text>
  <!-- Sóng nước -->
  <path d="M30,102 Q55,96 80,102 Q105,108 130,102 Q155,96 180,102 Q205,108 230,102 Q255,96 270,102" fill="none" stroke="#1e88e5" stroke-width="1.5"/>
  <defs>
    <marker id="arr3" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#333"/></marker>
  </defs>
</svg>`;
}

function svgLayer3(h1,h2,g1,g2,g3) {
  return `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="260" fill="#f8faff"/>
  <rect x="30" y="10" width="240" height="70" fill="#d4b896" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="50" y="48" font-family="sans-serif" font-size="12" fill="#5a3a1a">γ₁=${g1} kN/m³, h₁=${h1}m</text>
  <rect x="30" y="80" width="240" height="80" fill="#c8dbb0" stroke="#5a8a3a" stroke-width="1.5"/>
  <text x="50" y="122" font-family="sans-serif" font-size="12" fill="#2a5a1a">γ₂=${g2} kN/m³, h₂=${h2}m</text>
  <rect x="30" y="160" width="240" height="90" fill="#b0c8e8" stroke="#4a7ab5" stroke-width="1.5"/>
  <text x="50" y="208" font-family="sans-serif" font-size="12" fill="#1a3a6c">γ₃=${g3} kN/m³</text>
  <text x="50" y="224" font-family="sans-serif" font-size="11" fill="#1a3a6c">Lớp 3 (∞)</text>
</svg>`;
}

function svgBoussinesq() {
  return `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="220" fill="#f8faff"/>
  <!-- Mặt đất -->
  <line x1="20" y1="50" x2="280" y2="50" stroke="#9c7a5a" stroke-width="2"/>
  <rect x="20" y="50" width="260" height="160" fill="#e8d5b8" opacity="0.5"/>
  <!-- Gạch nền -->
  <text x="20" y="42" font-family="sans-serif" font-size="11" fill="#555">Mặt đất tự nhiên</text>
  <!-- Lực P -->
  <line x1="150" y1="5" x2="150" y2="50" stroke="#e53935" stroke-width="3" marker-end="url(#redArr)"/>
  <text x="158" y="30" font-family="sans-serif" font-size="12" font-weight="bold" fill="#e53935">P</text>
  <!-- Trục x -->
  <line x1="150" y1="50" x2="270" y2="50" stroke="#333" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="272" y="54" font-family="sans-serif" font-size="11" fill="#333">x</text>
  <!-- Điểm M -->
  <circle cx="220" cy="140" r="4" fill="#1565c0"/>
  <text x="226" y="144" font-family="sans-serif" font-size="11" fill="#1565c0">M</text>
  <!-- Đường z -->
  <line x1="150" y1="50" x2="150" y2="170" stroke="#333" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="153" y="165" font-family="sans-serif" font-size="11" fill="#333">z</text>
  <!-- Đường R -->
  <line x1="150" y1="50" x2="220" y2="140" stroke="#e53935" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="190" y="90" font-family="sans-serif" font-size="11" fill="#e53935">R</text>
  <!-- Mũi tên ngang r từ M đến trục z -->
  <line x1="150" y1="140" x2="218" y2="140" stroke="#555" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="170" y="135" font-family="sans-serif" font-size="10" fill="#555">r</text>
  <defs>
    <marker id="redArr" markerWidth="7" markerHeight="7" refX="3" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#e53935"/></marker>
  </defs>
</svg>`;
}

function svgChuNhat(note='tâm') {
  const dotX = note==='tâm' ? 150 : 270;
  return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="200" fill="#f8faff"/>
  <!-- Tải trọng -->
  ${[30,60,90,120,150,180,210,240,270].map(x=>`<line x1="${x}" y1="30" x2="${x}" y2="50" stroke="#e53935" stroke-width="1.5" marker-end="url(#ra)"/>`).join('')}
  <line x1="30" y1="30" x2="270" y2="30" stroke="#e53935" stroke-width="2"/>
  <!-- Móng -->
  <rect x="30" y="50" width="240" height="8" fill="#888"/>
  <!-- Kích thước l, b -->
  <line x1="30" y1="70" x2="270" y2="70" stroke="#333" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="140" y="85" font-family="sans-serif" font-size="12" fill="#333" text-anchor="middle">l</text>
  <text x="15" y="54" font-family="sans-serif" font-size="11" fill="#333">b</text>
  <!-- Đất -->
  <rect x="30" y="58" width="240" height="130" fill="#e8d5b8" opacity="0.6"/>
  <!-- Trục z -->
  <line x1="150" y1="58" x2="150" y2="185" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="154" y="180" font-family="sans-serif" font-size="11" fill="#555">z</text>
  <!-- Điểm M -->
  <circle cx="${dotX}" cy="140" r="4" fill="#1565c0"/>
  <text x="${dotX+6}" y="144" font-family="sans-serif" font-size="11" fill="#1565c0">M(${note})</text>
  <defs>
    <marker id="ra" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
  </defs>
</svg>`;
}

function svgBang(b,note='giữa băng') {
  return `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="210" fill="#f8faff"/>
  <!-- Tải hình băng -->
  ${[60,90,120,150,180,210,240].map(x=>`<line x1="${x}" y1="20" x2="${x}" y2="45" stroke="#e53935" stroke-width="1.5" marker-end="url(#ra2)"/>`).join('')}
  <line x1="60" y1="20" x2="240" y2="20" stroke="#e53935" stroke-width="2"/>
  <text x="65" y="16" font-family="sans-serif" font-size="11" fill="#e53935">p</text>
  <!-- Băng -->
  <rect x="60" y="45" width="180" height="8" fill="#888"/>
  <text x="50" y="58" font-family="sans-serif" font-size="11" fill="#333">b/2</text>
  <text x="222" y="58" font-family="sans-serif" font-size="11" fill="#333">b/2</text>
  <!-- Đất -->
  <rect x="0" y="53" width="300" height="150" fill="#e8d5b8" opacity="0.5"/>
  <!-- Trục -->
  <line x1="150" y1="53" x2="150" y2="200" stroke="#555" stroke-width="1" stroke-dasharray="4,3"/>
  <!-- Điểm M -->
  <circle cx="150" cy="145" r="4" fill="#1565c0"/>
  <text x="156" y="149" font-family="sans-serif" font-size="11" fill="#1565c0">M(${note})</text>
  <!-- z chiều sâu -->
  <line x1="10" y1="53" x2="10" y2="145" stroke="#333" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="13" y="105" font-family="sans-serif" font-size="11" fill="#333">z</text>
  <defs>
    <marker id="ra2" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
  </defs>
</svg>`;
}

function svgMong(type='cn') {
  return `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;border-radius:8px;border:1px solid #dce3ed">
  <rect x="0" y="0" width="300" height="210" fill="#f8faff"/>
  <!-- Mặt đất -->
  <line x1="20" y1="55" x2="280" y2="55" stroke="#9c7a5a" stroke-width="1.5"/>
  <text x="22" y="50" font-family="sans-serif" font-size="10" fill="#9c7a5a">Mặt đất tự nhiên</text>
  <!-- Gạch vẽ -->
  ${[20,40,60,80,100,120,140,160,180,200,220,240,260,280].map(x=>`<line x1="${x}" y1="55" x2="${x-12}" y2="65" stroke="#9c7a5a" stroke-width="0.8"/>`).join('')}
  <!-- Lực P0 -->
  <line x1="150" y1="5" x2="150" y2="30" stroke="#e53935" stroke-width="2.5" marker-end="url(#ra3)"/>
  <text x="158" y="20" font-family="sans-serif" font-size="12" font-weight="bold" fill="#e53935">P₀</text>
  <!-- Cột -->
  <rect x="130" y="30" width="40" height="20" fill="#90a4ae" stroke="#546e7a" stroke-width="1"/>
  <!-- Móng -->
  <rect x="70" y="50" width="160" height="15" fill="#78909c" stroke="#546e7a" stroke-width="1"/>
  <!-- Kích thước hm -->
  <line x1="15" y1="55" x2="15" y2="80" stroke="#333" stroke-width="1"/>
  <text x="1" y="72" font-family="sans-serif" font-size="9" fill="#333">hm</text>
  <!-- Đất -->
  <rect x="20" y="65" width="260" height="130" fill="#e8d5b8" opacity="0.55"/>
  <!-- Áp lực đáy móng -->
  ${[70,90,110,130,150,170,190,210,230].map(x=>`<line x1="${x}" y1="80" x2="${x}" y2="105" stroke="#1565c0" stroke-width="1.5" marker-end="url(#ba)"/>`).join('')}
  <text x="55" y="95" font-family="sans-serif" font-size="10" fill="#1565c0">p_tx</text>
  <defs>
    <marker id="ra3" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#e53935"/></marker>
    <marker id="ba" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto"><path d="M0,0 L3,6 L6,0 Z" fill="#1565c0"/></marker>
  </defs>
</svg>`;
}

// ── Bảng tra HTML helper ──────────────────────────────
function tableK0HTML() {
  const lbShow = [1,1.2,1.4,1.6,1.8,2,2.4,3,4,6];
  const zbShow = [0,0.2,0.4,0.6,0.8,1,1.2,1.5,1.8,2,2.5,3,4];
  let html = `<div style="overflow-x:auto;margin-top:8px"><table style="border-collapse:collapse;font-size:.78rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng k₀ – Hệ số ứng suất tại TÂM hình chữ nhật (σ_z = k₀·p)</caption>
  <tr style="background:#1565c0;color:#fff"><th style="padding:4px 6px">z/b↓ l/b→</th>`;
  lbShow.forEach(lb => html += `<th style="padding:4px 6px">${lb}</th>`);
  html += '</tr>';
  zbShow.forEach((zb,ri) => {
    html += `<tr style="background:${ri%2?'#f5f8ff':'#fff'}"><td style="padding:4px 6px;font-weight:600">${zb}</td>`;
    lbShow.forEach(lb => {
      const v = lookupK0(lb, zb);
      html += `<td style="padding:4px 6px;text-align:center">${v.toFixed(4)}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div>';
  return html;
}

function tableKcHTML() {
  const lbShow = [1,1.2,1.4,1.6,1.8,2,2.4,3,4,6];
  const zbShow = [0,0.25,0.5,0.75,1,1.25,1.5,2,3,4];
  let html = `<div style="overflow-x:auto;margin-top:8px"><table style="border-collapse:collapse;font-size:.78rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng k_c – Hệ số ứng suất tại GÓC hình chữ nhật (σ_z = k_c·p)</caption>
  <tr style="background:#1565c0;color:#fff"><th style="padding:4px 6px">z/b↓ l/b→</th>`;
  lbShow.forEach(lb => html += `<th style="padding:4px 6px">${lb}</th>`);
  html += '</tr>';
  zbShow.forEach((zb,ri) => {
    html += `<tr style="background:${ri%2?'#f5f8ff':'#fff'}"><td style="padding:4px 6px;font-weight:600">${zb}</td>`;
    lbShow.forEach(lb => {
      const v = lookupK0(lb, zb);
      html += `<td style="padding:4px 6px;text-align:center">${v.toFixed(4)}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div>';
  return html;
}

function tableKzHTML() {
  const xbShow = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  const zbShow = [0.1,0.25,0.5,0.75,1,1.25,1.5,2,3,5];
  let html = `<div style="overflow-x:auto;margin-top:8px"><table style="border-collapse:collapse;font-size:.78rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng k_z – Hình băng: σ_z = k_z·p</caption>
  <tr style="background:#2e7d32;color:#fff"><th style="padding:4px 6px">z/b↓ x/b→</th>`;
  xbShow.forEach(xb => html += `<th style="padding:4px 6px">${xb}</th>`);
  html += '</tr>';
  zbShow.forEach((zb,ri) => {
    html += `<tr style="background:${ri%2?'#f1f8f1':'#fff'}"><td style="padding:4px 6px;font-weight:600">${zb}</td>`;
    xbShow.forEach(xb => {
      const v = lookupKz(xb, zb);
      html += `<td style="padding:4px 6px;text-align:center">${v.toFixed(4)}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div>';
  return html;
}

function tableKxHTML() {
  const xbShow = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  const zbShow = [0.1,0.25,0.5,0.75,1,1.25,1.5,2];
  let html = `<div style="overflow-x:auto;margin-top:8px"><table style="border-collapse:collapse;font-size:.78rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng k_x – Hình băng: σ_x = k_x·p</caption>
  <tr style="background:#6a1599;color:#fff"><th style="padding:4px 6px">z/b↓ x/b→</th>`;
  xbShow.forEach(xb => html += `<th style="padding:4px 6px">${xb}</th>`);
  html += '</tr>';
  zbShow.forEach((zb,ri) => {
    html += `<tr style="background:${ri%2?'#f8f2ff':'#fff'}"><td style="padding:4px 6px;font-weight:600">${zb}</td>`;
    xbShow.forEach(xb => {
      const v = lookupKx(xb, zb);
      html += `<td style="padding:4px 6px;text-align:center">${isNaN(v)?'—':v.toFixed(4)}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div>';
  return html;
}

function tableKtHTML() {
  const xbShow = [0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3];
  const zbShow = [0.1,0.25,0.5,0.75,1,1.25,1.5,2];
  let html = `<div style="overflow-x:auto;margin-top:8px"><table style="border-collapse:collapse;font-size:.78rem;width:100%">
  <caption style="font-weight:700;margin-bottom:4px;text-align:left">Bảng k_t – Hình băng: τ_xz = k_t·p</caption>
  <tr style="background:#c62828;color:#fff"><th style="padding:4px 6px">z/b↓ x/b→</th>`;
  xbShow.forEach(xb => html += `<th style="padding:4px 6px">${xb}</th>`);
  html += '</tr>';
  zbShow.forEach((zb,ri) => {
    html += `<tr style="background:${ri%2?'#fff8f8':'#fff'}"><td style="padding:4px 6px;font-weight:600">${zb}</td>`;
    xbShow.forEach(xb => {
      const v = lookupKt(xb, zb);
      html += `<td style="padding:4px 6px;text-align:center">${isNaN(v)?'—':v.toFixed(4)}</td>`;
    });
    html += '</tr>';
  });
  html += '</table></div>';
  return html;
}

// ═══════════════════════════════════════════════════════
//  NHÓM A – ỨNG SUẤT TLBT KHÔNG MNN
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b01'] = {
  chapterId: 'ch2',
  title: '2.1 – Ứng suất tổng (2 lớp, không MNN)',
  type: 'guided',
  theoryHTML: `
    <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
      <div style="flex:1;min-width:200px">
        <p style="font-weight:700;margin-bottom:8px">Ứng suất thẳng đứng do TLBT – không có MNN</p>
        <p>Điểm tính nằm trong <b>lớp 1</b> (z ≤ h₁):</p>
        <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
          σ<sub>z</sub> = σ'<sub>z</sub> = z · γ₁
        </div>
        <p>Điểm tính nằm trong <b>lớp 2</b> (z > h₁):</p>
        <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
          σ<sub>z</sub> = σ'<sub>z</sub> = h₁·γ₁ + (z−h₁)·γ₂
        </div>
        <p style="font-size:.83rem;color:#555;margin-top:6px">⚠️ Không có MNN → ứng suất hữu hiệu = ứng suất tổng</p>
      </div>
      <div style="flex:0 0 auto">${svgLayer2('h₁','∞','γ₁','γ₂','Lớp 1','Lớp 2 (∞)')}</div>
    </div>`,
  hint: 'Kiểm tra z so với h₁ để chọn công thức đúng. Không có MNN nên σ = σ\'.',
  genData(rng) {
    const g1 = r2(17 + rng()*2);
    const g2 = r2(18 + rng()*1.5);
    const h1 = r2(6 + rng()*4);
    const z  = r2(h1 + 1 + rng()*4); // luôn nằm trong lớp 2
    const sig = r2(h1*g1 + (z-h1)*g2);
    return {g1,g2,h1,z,sig};
  },
  statement(d) {
    return `Nền đất gồm 2 lớp. Lớp 1 dày <b>${d.h1} m</b> có γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 dày vô cùng có γ₂ = <b>${d.g2} kN/m³</b>.
    <br>Tính <b>ứng suất tổng</b> σ<sub>z</sub> do trọng lượng bản thân đất tại độ sâu z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ_z tại z (kPa)', unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

EXERCISES['ch2_b02'] = {
  chapterId: 'ch2',
  title: '2.2 – Ứng suất tổng (2 lớp, z trong lớp 1)',
  type: 'apply',
  theoryHTML: `<p>Áp dụng công thức điểm trong <b>lớp 1</b>: σ<sub>z</sub> = z · γ₁</p>
    ${svgLayer2('h₁','∞','γ₁','γ₂','Lớp 1','Lớp 2')}`,
  hint: 'Điểm tính nằm trong lớp 1 → chỉ nhân z với γ₁.',
  genData(rng) {
    const g1 = r2(16.5 + rng()*2.5);
    const g2 = r2(18 + rng()*2);
    const h1 = r2(8 + rng()*4);
    const z  = r2(2 + rng()*(h1-2)); // z luôn trong lớp 1
    const sig = r2(z*g1);
    return {g1,g2,h1,z,sig};
  },
  statement(d) {
    return `Nền đất gồm 2 lớp. Lớp 1 dày <b>${d.h1} m</b> có γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 dày vô cùng có γ₂ = <b>${d.g2} kN/m³</b>.
    <br>Tính <b>ứng suất tổng</b> σ<sub>z</sub> tại độ sâu z = <b>${d.z} m</b> (nằm trong lớp 1).`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ_z tại z (kPa)', unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

EXERCISES['ch2_b03'] = {
  chapterId: 'ch2',
  title: '2.3 – Ứng suất hữu hiệu (2 lớp, không MNN)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:200px">
      <p style="font-weight:700;margin-bottom:6px">Không MNN → σ' = σ</p>
      <div style="background:#e8f5e9;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ'<sub>z</sub> = h₁·γ₁ + (z−h₁)·γ₂
      </div>
      <p style="font-size:.83rem;color:#555">Ứng suất hữu hiệu bằng ứng suất tổng khi không có áp lực nước lỗ rỗng u = 0.</p>
    </div>
    <div style="flex:0 0 auto">${svgLayer2('h₁','∞','γ₁','γ₂','Lớp 1','Lớp 2 (∞)')}</div>
  </div>`,
  hint: 'Không MNN nên u = 0, σ\'_z = σ_z = h₁γ₁ + (z−h₁)γ₂.',
  genData(rng) {
    const g1 = r2(17 + rng()*2);
    const g2 = r2(18 + rng()*1.5);
    const h1 = r2(7 + rng()*3);
    const z  = r2(h1 + 2 + rng()*4);
    const sig = r2(h1*g1 + (z-h1)*g2);
    return {g1,g2,h1,z,sig};
  },
  statement(d) {
    return `Nền đất gồm 2 lớp. Lớp 1 dày <b>${d.h1} m</b> có γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 dày vô cùng có γ₂ = <b>${d.g2} kN/m³</b>. Không có mực nước ngầm.
    <br>Tính <b>ứng suất hữu hiệu</b> σ'<sub>z</sub> tại độ sâu z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ\'_z (kPa)', unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

EXERCISES['ch2_b04'] = {
  chapterId: 'ch2',
  title: '2.4 – Ứng suất tổng (3 lớp, không MNN)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:200px">
      <p style="font-weight:700;margin-bottom:6px">3 lớp – không MNN</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.85rem">
        Lớp 1 (z ≤ h₁): σ<sub>z</sub> = z·γ₁<br>
        Lớp 2 (h₁ &lt; z ≤ h₁+h₂): σ<sub>z</sub> = h₁·γ₁ + (z−h₁)·γ₂<br>
        Lớp 3 (z > h₁+h₂): σ<sub>z</sub> = h₁·γ₁ + h₂·γ₂ + (z−h₁−h₂)·γ₃
      </div>
    </div>
    <div style="flex:0 0 auto">${svgLayer3('h₁','h₂','γ₁','γ₂','γ₃')}</div>
  </div>`,
  hint: 'Xác định điểm z nằm trong lớp nào (so với h₁ và h₁+h₂) rồi áp dụng công thức tương ứng.',
  genData(rng) {
    const g1 = r2(17 + rng()*1.5);
    const g2 = r2(16.5 + rng()*2);
    const g3 = r2(19 + rng()*1);
    const h1 = r2(3.5 + rng()*1);
    const h2 = r2(3 + rng()*1);
    const z  = r2(h1 + h2 + 1 + rng()*3); // trong lớp 3
    const sig = r2(h1*g1 + h2*g2 + (z-h1-h2)*g3);
    return {g1,g2,g3,h1,h2,z,sig};
  },
  statement(d) {
    return `Nền đất gồm 3 lớp. Lớp 1 dày <b>${d.h1} m</b>, γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 dày <b>${d.h2} m</b>, γ₂ = <b>${d.g2} kN/m³</b>. Lớp 3 dày vô cùng, γ₃ = <b>${d.g3} kN/m³</b>.
    <br>Tính <b>ứng suất tổng</b> σ<sub>z</sub> tại z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'h₁ + h₂ (m)', unit:'m', answer: d=>r2(d.h1+d.h2), tol:0.1 },
    { id:'q2', type:'fill', label:'σ_z (kPa)', unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM B – ỨNG SUẤT CÓ MNN
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b05'] = {
  chapterId: 'ch2',
  title: '2.5 – Ứng suất tổng & hữu hiệu (có MNN)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Khi có Mực Nước Ngầm (MNN)</p>
      <ul style="font-size:.86rem;line-height:1.8;padding-left:18px">
        <li>Trên MNN: dùng γ tự nhiên, u = 0 → σ' = σ</li>
        <li>Dưới MNN: dùng γ<sub>bh</sub> (bão hòa), u = γ<sub>w</sub>·h<sub>w</sub></li>
      </ul>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-size:.84rem;font-family:monospace">
        σ<sub>z</sub> = h₁·γ₁ + (h<sub>nn</sub>−h₁)·γ₂ + (z−h<sub>nn</sub>)·γ<sub>bh</sub><br>
        u = (z−h<sub>nn</sub>)·γ<sub>w</sub>  (γ<sub>w</sub>=10 kN/m³)<br>
        σ'<sub>z</sub> = σ<sub>z</sub> − u
      </div>
    </div>
    <div style="flex:0 0 auto">${svgLayer2MNN('h₁','h_nn','γ₁','γ₂','γ_dn')}</div>
  </div>`,
  hint: 'Tính u = γw × chiều sâu dưới MNN. σ\' = σ - u.',
  genData(rng) {
    const g1  = r2(18 + rng()*0.5);
    const g2  = r2(17 + rng()*0.5);
    const gdn = 13;
    const gbh = r2(gdn + 10);
    const h1  = r2(3);
    const hnn = r2(5 + rng()*0.5); // MNN tại lớp 2
    const z   = r2(hnn + 1 + rng()*2); // dưới MNN
    const sig  = r2(h1*g1 + (hnn-h1)*g2 + (z-hnn)*gbh);
    const u    = r2((z-hnn)*10);
    const sige = r2(sig - u);
    return {g1,g2,gdn,gbh,h1,hnn,z,sig,u,sige};
  },
  statement(d) {
    return `Nền đất gồm 2 lớp. Lớp 1 là đất sét dày <b>${d.h1} m</b>, γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 là cát thô, γ₂ = <b>${d.g2} kN/m³</b>, γ<sub>dn</sub> = <b>${d.gdn} kN/m³</b>.
    <br>Mực nước ngầm ở độ sâu <b>${d.hnn} m</b>. Tính <b>ứng suất tổng</b> và <b>hữu hiệu</b> tại z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ_z tổng (kPa)', unit:'kPa', answer: d=>d.sig,  tol:2 },
    { id:'q2', type:'fill', label:'u (kPa)',         unit:'kPa', answer: d=>d.u,    tol:1 },
    { id:'q3', type:'fill', label:'σ\'_z hữu hiệu (kPa)', unit:'kPa', answer: d=>d.sige, tol:2 },
  ]
};

EXERCISES['ch2_b06'] = {
  chapterId: 'ch2',
  title: '2.6 – Ứng suất hữu hiệu (3 lớp, có MNN)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:200px">
      <p style="font-weight:700;margin-bottom:6px">MNN nằm trong lớp 2</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-size:.84rem;font-family:monospace">
        σ<sub>z</sub> = h₁·γ₁ + (h<sub>nn</sub>−h₁)·γ₂ + (h₁+h₂−h<sub>nn</sub>)·γ<sub>bh2</sub> + (z−h₁−h₂)·γ<sub>bh3</sub><br>
        u = (z−h<sub>nn</sub>)·γ<sub>w</sub><br>
        σ'<sub>z</sub> = σ<sub>z</sub> − u
      </div>
    </div>
    <div style="flex:0 0 auto">${svgLayer3('h₁','h₂','γ₁','γ₂','γ₃_bh')}</div>
  </div>`,
  hint: 'MNN tại h_nn, điểm tính nằm trong lớp 3. Tính u theo chiều sâu từ MNN xuống điểm tính.',
  genData(rng) {
    const g1  = r2(18 + rng()*0.5);
    const g2  = r2(17.2 + rng()*0.5);
    const gdn2= 13;
    const gbh2= gdn2+10;
    const gbn3= r2(19.2 + rng()*0.5);
    const h1  = r2(3);
    const h2  = r2(3.5 + rng()*1);
    const hnn = r2(h1 + 0.5 + rng()*1); // MNN trong lớp 2
    const z   = r2(h1+h2 + 1.5 + rng()*2); // lớp 3
    const sig  = r2(h1*g1 + (hnn-h1)*g2 + (h1+h2-hnn)*gbh2 + (z-h1-h2)*gbn3);
    const u    = r2((z-hnn)*10);
    const sige = r2(sig - u);
    return {g1,g2,gdn2,gbh2,gbn3,h1,h2,hnn,z,sig,u,sige};
  },
  statement(d) {
    return `Nền đất 3 lớp. Lớp 1 dày <b>${d.h1} m</b>, γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 dày <b>${d.h2} m</b>, γ₂ = <b>${d.g2} kN/m³</b>, γ<sub>dn</sub> = <b>${d.gdn2} kN/m³</b>. Lớp 3 vô cùng, γ<sub>bh</sub> = <b>${d.gbn3} kN/m³</b>.
    <br>MNN tại độ sâu <b>${d.hnn} m</b>. Tính σ<sub>z</sub> và σ'<sub>z</sub> tại z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ_z (kPa)',       unit:'kPa', answer: d=>d.sig,  tol:2 },
    { id:'q2', type:'fill', label:'u (kPa)',          unit:'kPa', answer: d=>d.u,    tol:1 },
    { id:'q3', type:'fill', label:'σ\'_z (kPa)',     unit:'kPa', answer: d=>d.sige, tol:2 },
  ]
};

EXERCISES['ch2_b07'] = {
  chapterId: 'ch2',
  title: '2.7 – Vẽ biểu đồ ứng suất (có MNN)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Vị trí quan trọng cần tính</p>
      <ul style="font-size:.86rem;line-height:1.9;padding-left:18px">
        <li>Mặt đất (z=0): σ = σ' = 0</li>
        <li>Đáy lớp 1 (z=h₁): σ = h₁·γ₁</li>
        <li>Ngay trên MNN: σ theo γ tự nhiên</li>
        <li>Ngay dưới MNN: u bắt đầu tăng</li>
        <li>Điểm tính: σ − u = σ'</li>
      </ul>
    </div>
    <div style="flex:0 0 auto">${svgLayer2MNN('h₁','h_nn','γ₁','γ₂','γ_dn')}</div>
  </div>`,
  hint: 'Tính tại 3 vị trí: mặt đất, vị trí MNN, điểm cần tính. Chú ý: trên MNN dùng γ tự nhiên.',
  genData(rng) {
    const g1  = r2(18.2 + rng()*0.5);
    const g2  = r2(17.2 + rng()*0.5);
    const gdn = 13;
    const h1  = r2(3 + rng()*1);
    const h2t = r2(3 + rng()*0.5);  // h2 total
    const hnn = r2(h1 + h2t*0.4);   // MNN trong lớp 2
    const z   = r2(h1 + h2t + 1 + rng()*2);
    const sig_h1 = r2(h1*g1);
    const sig_nn = r2(h1*g1 + (hnn-h1)*g2);
    const sig_z  = r2(sig_nn + (z-hnn)*(gdn+10));
    const u      = r2((z-hnn)*10);
    const sige   = r2(sig_z - u);
    return {g1,g2,gdn,h1,hnn,z,sig_h1,sig_nn,sig_z,u,sige};
  },
  statement(d) {
    return `Nền đất 2 lớp. Lớp 1 (đất sét) dày <b>${d.h1} m</b>, γ₁ = <b>${d.g1} kN/m³</b>. Lớp 2 (cát bão hòa), γ₂ = <b>${d.g2} kN/m³</b>, γ<sub>dn</sub> = <b>${d.gdn} kN/m³</b>.
    <br>MNN tại độ sâu <b>${d.hnn} m</b>. Tính σ<sub>z</sub> và σ'<sub>z</sub> tại z = <b>${d.z} m</b> (lớp 3) và tại MNN.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'σ_z tại MNN (kPa)',  unit:'kPa', answer: d=>d.sig_nn, tol:2 },
    { id:'q2', type:'fill', label:'σ_z tại điểm z (kPa)', unit:'kPa', answer: d=>d.sig_z,  tol:2 },
    { id:'q3', type:'fill', label:'u tại z (kPa)',       unit:'kPa', answer: d=>d.u,       tol:1 },
    { id:'q4', type:'fill', label:'σ\'_z (kPa)',         unit:'kPa', answer: d=>d.sige,    tol:2 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM C – TẢI TẬP TRUNG BOUSSINESQ
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b08'] = {
  chapterId: 'ch2',
  title: '2.8 – Boussinesq: Tải tập trung thẳng đứng',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Bài toán Boussinesq</p>
      <p style="font-size:.86rem;margin-bottom:8px">Tải tập trung P đặt trên mặt bán không gian đàn hồi. Ứng suất tại điểm M(r, z):</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>z</sub> = (3P/2π) · z³/R⁵<br><br>
        trong đó: R = √(r² + z²)
      </div>
      <p style="font-size:.83rem;color:#555">r: khoảng cách ngang từ trục đến điểm M<br>z: chiều sâu của M<br>R: khoảng cách từ điểm đặt lực đến M</p>
    </div>
    <div style="flex:0 0 auto">${svgBoussinesq()}</div>
  </div>`,
  hint: 'Tính R = √(r²+z²) trước, rồi áp dụng công thức σz = 3P·z³/(2π·R⁵).',
  genData(rng) {
    const P = Math.round((300 + rng()*200)*10)/10;
    const r = r2(1.5 + rng()*1);
    const z = r2(2 + rng()*1.5);
    const R = r2(Math.sqrt(r*r + z*z));
    const sig = r2(3*P*Math.pow(z,3)/(2*Math.PI*Math.pow(R,5)));
    return {P,r,z,R,sig};
  },
  statement(d) {
    return `Tải trọng tập trung thẳng đứng P = <b>${d.P} kN</b> đặt trên mặt đất.
    <br>Tính <b>ứng suất nén thẳng đứng</b> σ<sub>z</sub> tại điểm M cách trục thẳng đứng <b>r = ${d.r} m</b> và ở độ sâu <b>z = ${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'R = √(r²+z²) (m)', unit:'m',  answer: d=>d.R,   tol:0.05 },
    { id:'q2', type:'fill', label:'σ_z (kPa)',         unit:'kPa', answer: d=>d.sig, tol:1 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM D – TẢI PHÂN BỐ ĐỀU CHỮ NHẬT (k0, kc)
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b09'] = {
  chapterId: 'ch2',
  title: '2.9 – Tải chữ nhật: Ứng suất tại TÂM (k₀)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tải phân bố đều trên diện hình chữ nhật</p>
      <p style="font-size:.86rem;margin-bottom:6px">Điểm M nằm trên trục thẳng đứng qua <b>tâm</b> diện chịu tải:</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>z</sub>(M) = p · k₀<br>
        k₀ = f(l/b; z/b) – tra bảng
      </div>
      <p style="font-size:.83rem;color:#555">l: chiều dài móng; b: chiều rộng móng<br>z: chiều sâu điểm M tính từ đáy móng</p>
    </div>
    <div style="flex:0 0 auto">${svgChuNhat('tâm')}</div>
  </div>
  ${tableK0HTML()}`,
  hint: 'Tính l/b và z/b, tra bảng k₀, rồi σ_z = p × k₀.',
  genData(rng) {
    const p  = Math.round(20 + rng()*30);
    const b  = r2(2 + rng()*2);
    const l  = r2(b * (1 + rng()*2));
    const z  = r2(0.5 + rng()*3);
    const lb = r2(l/b);
    const zb = r2(z/b);
    const k0 = r2(lookupK0(lb, zb));
    const sig= r2(p*k0);
    return {p,b,l,z,lb,zb,k0,sig};
  },
  statement(d) {
    return `Tải trọng phân bố đều cường độ p = <b>${d.p} kN/m²</b> trên móng hình chữ nhật l×b = <b>${d.l}×${d.b} m</b>.
    <br>Tính <b>ứng suất nén thẳng đứng</b> σ<sub>z</sub> tại điểm nằm trên trục thẳng đứng qua <b>tâm móng</b> ở độ sâu <b>z = ${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'l/b',   unit:'',   answer: d=>d.lb, tol:0.05 },
    { id:'q2', type:'fill', label:'z/b',   unit:'',   answer: d=>d.zb, tol:0.05 },
    { id:'q3', type:'fill', label:'k₀ (tra bảng)', unit:'', answer: d=>d.k0, tol:0.005 },
    { id:'q4', type:'fill', label:'σ_z (kPa)',     unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

EXERCISES['ch2_b10'] = {
  chapterId: 'ch2',
  title: '2.10 – Tải chữ nhật: Ứng suất tại GÓC (k_c)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Điểm M tại GÓC diện chịu tải</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>z</sub>(M) = p · k_c<br>
        k_c = f(l/b; z/b) – tra bảng góc
      </div>
      <p style="font-size:.83rem;color:#555;margin-top:6px">💡 Muốn tính tại điểm bất kỳ: chia móng thành các hình chữ nhật con, mỗi góc qua điểm đó, rồi cộng ứng suất.</p>
    </div>
    <div style="flex:0 0 auto">${svgChuNhat('góc')}</div>
  </div>
  ${tableKcHTML()}`,
  hint: 'Tính l/b và z/b, tra bảng k_c (bảng góc), σ_z = p × k_c.',
  genData(rng) {
    const p  = Math.round(30 + rng()*40);
    const b  = r2(2 + rng()*2);
    const l  = r2(b * (1 + rng()*2));
    const z  = r2(0.5 + rng()*3);
    const lb = r2(l/b);
    const zb = r2(z/b);
    const kc = r2(lookupK0(lb, zb));
    const sig= r2(p*kc);
    return {p,b,l,z,lb,zb,kc,sig};
  },
  statement(d) {
    return `Tải phân bố đều p = <b>${d.p} kN/m²</b> trên móng hình chữ nhật l×b = <b>${d.l}×${d.b} m</b>.
    <br>Tính σ<sub>z</sub> tại điểm nằm trên trục thẳng đứng qua <b>góc móng</b>, ở độ sâu z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'l/b',              unit:'',    answer: d=>d.lb,  tol:0.05 },
    { id:'q2', type:'fill', label:'z/b',              unit:'',    answer: d=>d.zb,  tol:0.05 },
    { id:'q3', type:'fill', label:'k_c (tra bảng)',  unit:'',    answer: d=>d.kc,  tol:0.005 },
    { id:'q4', type:'fill', label:'σ_z (kPa)',       unit:'kPa', answer: d=>d.sig, tol:2 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM E – TẢI HÌNH BĂNG FLAMANT (kz, kx, kt)
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b11'] = {
  chapterId: 'ch2',
  title: '2.11 – Tải hình băng: σ_z tại điểm bất kỳ (k_z)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tải phân bố đều trên dải băng rộng b (bài toán phẳng)</p>
      <div style="background:#e8f5e9;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>z</sub>(M) = k<sub>z</sub> · p<br>
        k<sub>z</sub> = f(x/b; z/b) – tra bảng
      </div>
      <p style="font-size:.83rem;color:#555">x: khoảng cách ngang từ <b>mép băng gần nhất</b> đến M (x>0: ngoài băng, x&lt;0: trong băng)<br>
      b: chiều rộng băng; z: chiều sâu</p>
    </div>
    <div style="flex:0 0 auto">${svgBang(2,'x/b, z/b')}</div>
  </div>
  ${tableKzHTML()}`,
  hint: 'x/b tính từ mép băng. Nếu M dưới giữa băng: x=0. Tra bảng kz theo x/b và z/b.',
  genData(rng) {
    const p  = Math.round(200 + rng()*150);
    const b  = r2(2 + rng()*2);
    const xb = r2(rng()*0.8); // x/b 0..0.8 (trong hoặc gần mép)
    const zb = r2(0.4 + rng()*1.5);
    const kz = r2(lookupKz(xb, zb));
    const sig= r2(p*kz);
    return {p,b,xb,zb,kz,sig, x:r2(xb*b), z:r2(zb*b)};
  },
  statement(d) {
    return `Tải hình băng phân bố đều cường độ p = <b>${d.p} kN/m²</b> trên bề rộng b = <b>${d.b} m</b>.
    <br>Tính <b>σ<sub>z</sub></b> tại điểm M có x = <b>${d.x} m</b> (tính từ mép băng), z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'x/b',             unit:'',    answer: d=>d.xb,  tol:0.02 },
    { id:'q2', type:'fill', label:'z/b',             unit:'',    answer: d=>d.zb,  tol:0.02 },
    { id:'q3', type:'fill', label:'k_z (tra bảng)', unit:'',    answer: d=>d.kz,  tol:0.005 },
    { id:'q4', type:'fill', label:'σ_z (kPa)',      unit:'kPa', answer: d=>d.sig, tol:3 },
  ]
};

EXERCISES['ch2_b12'] = {
  chapterId: 'ch2',
  title: '2.12 – Tải hình băng: σ_x tại điểm bất kỳ (k_x)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Ứng suất ngang σ_x – tải hình băng</p>
      <div style="background:#f3e5ff;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>x</sub>(M) = k<sub>x</sub> · p<br>
        k<sub>x</sub> = f(x/b; z/b) – tra bảng k_x
      </div>
    </div>
    <div style="flex:0 0 auto">${svgBang(2,'M(x,z)')}</div>
  </div>
  ${tableKxHTML()}`,
  hint: 'Tra bảng k_x theo x/b và z/b, σ_x = k_x × p.',
  genData(rng) {
    const p  = Math.round(200 + rng()*150);
    const b  = r2(2 + rng()*2);
    const xb = r2(rng()*0.7);
    const zb = r2(0.3 + rng()*1.2);
    const kx = r2(lookupKx(xb, zb));
    const sig= r2(p*kx);
    return {p,b,xb,zb,kx,sig, x:r2(xb*b), z:r2(zb*b)};
  },
  statement(d) {
    return `Tải hình băng p = <b>${d.p} kN/m²</b>, bề rộng b = <b>${d.b} m</b>.
    <br>Tính <b>σ<sub>x</sub></b> tại M có x = <b>${d.x} m</b>, z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'x/b',            unit:'',    answer: d=>d.xb,  tol:0.02 },
    { id:'q2', type:'fill', label:'z/b',            unit:'',    answer: d=>d.zb,  tol:0.02 },
    { id:'q3', type:'fill', label:'k_x (tra bảng)',unit:'',    answer: d=>d.kx,  tol:0.005 },
    { id:'q4', type:'fill', label:'σ_x (kPa)',     unit:'kPa', answer: d=>d.sig, tol:3 },
  ]
};

EXERCISES['ch2_b13'] = {
  chapterId: 'ch2',
  title: '2.13 – Tải hình băng: τ_xz tại điểm bất kỳ (k_t)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Ứng suất cắt τ_xz – tải hình băng</p>
      <div style="background:#fff3e0;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        τ<sub>xz</sub>(M) = k<sub>t</sub> · p<br>
        k<sub>t</sub> = f(x/b; z/b) – tra bảng k_t
      </div>
      <p style="font-size:.83rem;color:#555">⚠️ Tại trục đối xứng (x/b = 0): τ_xz = 0 (điểm đặc biệt)</p>
    </div>
    <div style="flex:0 0 auto">${svgBang(2,'M(x,z)')}</div>
  </div>
  ${tableKtHTML()}`,
  hint: 'x/b ≠ 0 (điểm nằm lệch so với trục đối xứng). Tra bảng k_t.',
  genData(rng) {
    const p  = Math.round(200 + rng()*150);
    const b  = r2(2 + rng()*2);
    const xb = r2(0.2 + rng()*0.8); // x/b > 0
    const zb = r2(0.3 + rng()*1.2);
    const kt = r2(lookupKt(xb, zb));
    const sig= r2(p*kt);
    return {p,b,xb,zb,kt,sig, x:r2(xb*b), z:r2(zb*b)};
  },
  statement(d) {
    return `Tải hình băng p = <b>${d.p} kN/m²</b>, bề rộng b = <b>${d.b} m</b>.
    <br>Tính <b>ứng suất cắt τ<sub>xz</sub></b> tại M có x = <b>${d.x} m</b> (từ mép băng), z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'x/b',            unit:'',    answer: d=>d.xb,  tol:0.02 },
    { id:'q2', type:'fill', label:'z/b',            unit:'',    answer: d=>d.zb,  tol:0.02 },
    { id:'q3', type:'fill', label:'k_t (tra bảng)',unit:'',    answer: d=>d.kt,  tol:0.005 },
    { id:'q4', type:'fill', label:'τ_xz (kPa)',    unit:'kPa', answer: d=>d.sig, tol:3 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM F – ỨNG SUẤT CHÍNH HÌNH BĂNG
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b14'] = {
  chapterId: 'ch2',
  title: '2.14 – Ứng suất chính σ₁ tại điểm dưới mép băng',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Ứng suất chính – bài toán phẳng hình băng</p>
      <p style="font-size:.86rem;margin-bottom:6px">Phương ứng suất chính trùng phân giác của góc 2β:</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        σ<sub>1,3</sub> = (p/π)(2β ± sin 2β)<br>
        β: góc nhìn từ M tới hai mép băng (rad)<br>
        σ₁ = (p/π)(2β + sin 2β) – ứng suất lớn<br>
        σ₃ = (p/π)(2β − sin 2β) – ứng suất nhỏ
      </div>
      <p style="font-size:.83rem;color:#e53935;font-weight:600">⚠️ β tính theo RADIAN!</p>
    </div>
    <div style="flex:0 0 auto">
      <svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;border-radius:8px;border:1px solid #dce3ed">
        <rect width="260" height="200" fill="#f8faff"/>
        <line x1="10" y1="50" x2="250" y2="50" stroke="#888" stroke-width="1.5"/>
        <rect x="80" y="30" width="100" height="20" fill="#888" opacity="0.6"/>
        <text x="85" y="25" font-family="sans-serif" font-size="11" fill="#e53935">p</text>
        <line x1="80" y1="50" x2="90" y2="150" stroke="#333" stroke-width="1.5"/>
        <line x1="180" y1="50" x2="90" y2="150" stroke="#333" stroke-width="1.5"/>
        <circle cx="90" cy="150" r="4" fill="#1565c0"/>
        <text x="96" y="154" font-family="sans-serif" font-size="11" fill="#1565c0">M</text>
        <text x="55" y="120" font-family="sans-serif" font-size="11" fill="#1565c0">β</text>
        <text x="100" y="120" font-family="sans-serif" font-size="11" fill="#1565c0">β</text>
        <text x="15" y="48" font-family="sans-serif" font-size="10" fill="#888">b/2</text>
        <text x="165" y="48" font-family="sans-serif" font-size="10" fill="#888">b/2</text>
        <line x1="88" y1="80" x2="100" y2="80" stroke="#1565c0" stroke-width="1" fill="none"/>
        <path d="M88,120 A30,30 0 0,1 108,100" fill="none" stroke="#1565c0" stroke-width="1"/>
      </svg>
    </div>
  </div>`,
  hint: 'Tính β (rad) = atan(b/2 / z) + atan(x_M/z) tùy vị trí M. Sau đó tính σ₁ = p/π × (2β + sin2β).',
  genData(rng) {
    const p  = Math.round(250 + rng()*150);
    const b  = r2(3 + rng()*1.5);
    const z  = r2(1.5 + rng()*1.5);
    // M dưới mép băng: x_M từ mép
    const beta = r2(Math.atan(b/(2*z)) + Math.atan(0)); // dưới mép gần (x=b/2 từ tâm)
    // tính lại với M dưới mép phải
    const beta2 = Math.atan(b/z); // góc từ M thấy toàn băng
    const sin2b = Math.sin(2*beta2);
    const s1 = r2(p/Math.PI * (2*beta2 + sin2b));
    const s3 = r2(p/Math.PI * (2*beta2 - sin2b));
    return {p,b,z,beta:r2(beta2), sin2b:r2(sin2b), s1, s3};
  },
  statement(d) {
    return `Tải hình băng phân bố đều p = <b>${d.p} kN/m²</b>, bề rộng b = <b>${d.b} m</b>.
    <br>Tính <b>ứng suất chính σ₁ và σ₃</b> tại điểm M nằm trên trục thẳng đứng qua <b>mép băng</b>, độ sâu z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'β (rad)',          unit:'rad', answer: d=>d.beta,  tol:0.02 },
    { id:'q2', type:'fill', label:'sin(2β)',          unit:'',    answer: d=>d.sin2b, tol:0.01 },
    { id:'q3', type:'fill', label:'σ₁ (kPa)',         unit:'kPa', answer: d=>d.s1,   tol:3 },
    { id:'q4', type:'fill', label:'σ₃ (kPa)',         unit:'kPa', answer: d=>d.s3,   tol:3 },
  ]
};

EXERCISES['ch2_b15'] = {
  chapterId: 'ch2',
  title: '2.15 – Ứng suất chính σ₃ tại điểm dưới mép băng',
  type: 'apply',
  theoryHTML: `<div style="background:#fff3e0;border-radius:7px;padding:10px;margin-bottom:10px;font-size:.86rem">
    <b>Công thức:</b> σ<sub>1,3</sub> = (p/π)(2β ± sin 2β) — β tính theo radian
  </div>
  <p style="font-size:.86rem">Bài này yêu cầu tính <b>σ₃</b> (ứng suất chính nhỏ) tại điểm M dưới giữa băng (x=0 từ tâm băng).</p>`,
  hint: 'Điểm M dưới giữa băng: β = arctan(b/(2z)). Tính σ₃ = p/π × (2β - sin2β).',
  genData(rng) {
    const p  = Math.round(250 + rng()*150);
    const b  = r2(3 + rng()*1.5);
    const z  = r2(1.5 + rng()*1.5);
    const beta = Math.atan(b/(2*z));
    const sin2b = Math.sin(2*beta);
    const s1 = r2(p/Math.PI * (2*beta + sin2b));
    const s3 = r2(p/Math.PI * (2*beta - sin2b));
    return {p,b,z, beta:r2(beta), sin2b:r2(sin2b), s1, s3};
  },
  statement(d) {
    return `Tải hình băng p = <b>${d.p} kN/m²</b>, bề rộng b = <b>${d.b} m</b>.
    <br>Tính ứng suất chính <b>σ₁ và σ₃</b> tại M nằm trên trục đối xứng của băng (<b>dưới giữa</b>), độ sâu z = <b>${d.z} m</b>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'β (rad)',  unit:'rad', answer: d=>d.beta,  tol:0.02 },
    { id:'q2', type:'fill', label:'σ₁ (kPa)', unit:'kPa', answer: d=>d.s1,   tol:3 },
    { id:'q3', type:'fill', label:'σ₃ (kPa)', unit:'kPa', answer: d=>d.s3,   tol:3 },
  ]
};

// ═══════════════════════════════════════════════════════
//  NHÓM G – TẢI TIẾP XÚC MÓNG & TẢI GÂY LÚN
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_b16'] = {
  chapterId: 'ch2',
  title: '2.16 – Tải tiếp xúc móng chữ nhật (đúng tâm)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tải đúng tâm → áp lực tiếp xúc phân bố đều</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        p<sub>tx</sub> = P₀/F + γ<sub>tb</sub>·h<sub>m</sub><br><br>
        F = l × b (diện tích đáy móng)<br>
        γ<sub>tb</sub> = 20 kN/m³ (TL riêng TB vật liệu)<br>
        h<sub>m</sub>: chiều sâu chôn móng
      </div>
    </div>
    <div style="flex:0 0 auto">${svgMong()}</div>
  </div>`,
  hint: 'F = l×b, rồi p_tx = P₀/F + γ_tb × h_m. Đơn vị P₀ là kN (chuyển T sang kN: ×10).',
  genData(rng) {
    const b  = r2(2 + rng()*1.5);
    const l  = r2(b*(1 + rng()*1));
    const hm = r2(1.2 + rng()*0.6);
    const g  = r2(17 + rng()*1.5);
    const P0 = Math.round((60 + rng()*40)*10); // kN (= T×10)
    const F  = r2(l*b);
    const ptx= r2(P0/F + 20*hm);
    return {b,l,hm,g,P0,F,ptx};
  },
  statement(d) {
    return `Móng hình chữ nhật l×b = <b>${d.l}×${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b> trong nền đất γ = <b>${d.g} kN/m³</b>.
    <br>Tải trọng công trình tác dụng tại đáy móng: P₀ = <b>${d.P0} kN</b> (đúng tâm).
    <br>Tính <b>tải trọng tiếp xúc</b> p<sub>tx</sub> tại đáy móng.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'F = l×b (m²)',     unit:'m²',   answer: d=>d.F,   tol:0.05 },
    { id:'q2', type:'fill', label:'p_tx (kN/m²)',     unit:'kPa',  answer: d=>d.ptx, tol:2 },
  ]
};

EXERCISES['ch2_b17'] = {
  chapterId: 'ch2',
  title: '2.17 – Tải tiếp xúc móng chữ nhật (lệch tâm)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tải lệch tâm → áp lực tiếp xúc phân bố bậc nhất</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace;font-size:.84rem">
        p<sub>tb</sub> = P₀/F + γ<sub>tb</sub>·h<sub>m</sub><br>
        p<sub>max</sub> = p<sub>tb</sub> + M/W<br>
        p<sub>min</sub> = p<sub>tb</sub> − M/W<br><br>
        W = b·l²/6  (mô men chống uốn tiết diện đáy móng)
      </div>
    </div>
    <div style="flex:0 0 auto">${svgMong('lech')}</div>
  </div>`,
  hint: 'Tính W = b×l²/6. Sau đó p_max/min = p_tb ± M/W.',
  genData(rng) {
    const b  = r2(2 + rng()*1);
    const l  = r2(b*(1 + rng()*1));
    const hm = r2(1.2 + rng()*0.5);
    const N0 = Math.round((80 + rng()*30)*10);  // kN
    const M0 = Math.round((4 + rng()*3)*10)/10; // kN.m
    const F  = r2(l*b);
    const W  = r2(b*l*l/6);
    const ptb= r2(N0/F + 20*hm);
    const pmax=r2(ptb + M0/W);
    const pmin=r2(ptb - M0/W);
    return {b,l,hm,N0,M0,F,W,ptb,pmax,pmin};
  },
  statement(d) {
    return `Móng hình chữ nhật l×b = <b>${d.l}×${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b>.
    <br>Tải trọng tại chân cột: N₀ = <b>${d.N0} kN</b>, M₀ = <b>${d.M0} kN.m</b>.
    <br>Tính <b>p<sub>max</sub></b> và <b>p<sub>min</sub></b> tại đáy móng.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'W = b·l²/6 (m³)',  unit:'m³',  answer: d=>d.W,    tol:0.05 },
    { id:'q2', type:'fill', label:'p_tb (kN/m²)',      unit:'kPa', answer: d=>d.ptb,  tol:2 },
    { id:'q3', type:'fill', label:'p_max (kN/m²)',     unit:'kPa', answer: d=>d.pmax, tol:2 },
    { id:'q4', type:'fill', label:'p_min (kN/m²)',     unit:'kPa', answer: d=>d.pmin, tol:2 },
  ]
};

EXERCISES['ch2_b18'] = {
  chapterId: 'ch2',
  title: '2.18 – Tải tiếp xúc móng băng (đúng tâm)',
  type: 'apply',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Móng băng – tải đúng tâm (trên 1 m dài)</p>
      <div style="background:#e3f0fd;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        p<sub>tx</sub> = P₀/b + γ<sub>tb</sub>·h<sub>m</sub><br><br>
        P₀: kN/m (tải trên 1m dài)<br>
        b: chiều rộng băng (m)
      </div>
    </div>
    <div style="flex:0 0 auto">${svgMong()}</div>
  </div>`,
  hint: 'Móng băng: chia P₀ cho b (không phải l×b). P₀ đơn vị kN/m.',
  genData(rng) {
    const b  = r2(2 + rng()*1);
    const hm = r2(1.3 + rng()*0.5);
    const g  = r2(19 + rng()*0.5);
    const P0 = Math.round((30 + rng()*20)*10)/10; // kN/m
    const ptx= r2(P0/b + 20*hm);
    return {b,hm,g,P0,ptx};
  },
  statement(d) {
    return `Móng hình băng bề rộng b = <b>${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b>, γ = <b>${d.g} kN/m³</b>.
    <br>Tải trọng tại chân tường N = <b>${d.P0} kN/m</b> (đúng tâm).
    <br>Tính <b>tải trọng tiếp xúc</b> p<sub>tx</sub> tại đáy móng.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'p_tx (kN/m²)', unit:'kPa', answer: d=>d.ptx, tol:2 },
  ]
};

EXERCISES['ch2_b19'] = {
  chapterId: 'ch2',
  title: '2.19 – Tải tiếp xúc móng băng (lệch tâm)',
  type: 'apply',
  theoryHTML: `<div style="background:#e3f0fd;border-radius:7px;padding:10px;margin-bottom:10px;font-family:monospace;font-size:.84rem">
    p<sub>tb</sub> = P₀/b + γ<sub>tb</sub>·h<sub>m</sub><br>
    W = b²/6  (mô men chống uốn – móng băng 1m dài)<br>
    p<sub>max</sub> = p<sub>tb</sub> + M/W ;  p<sub>min</sub> = p<sub>tb</sub> − M/W
  </div>`,
  hint: 'Móng băng: W = b²/6 (khác móng chữ nhật là b×l²/6).',
  genData(rng) {
    const b  = r2(1.6 + rng()*0.5);
    const hm = r2(1.2 + rng()*0.5);
    const g  = r2(18 + rng()*0.5);
    const N0 = Math.round((25 + rng()*10)*10)/10; // kN/m
    const M0 = Math.round((1.5 + rng()*1)*10)/10; // kN.m/m
    const W  = r2(b*b/6);
    const ptb= r2(N0/b + 20*hm);
    const pmax=r2(ptb + M0/W);
    const pmin=r2(ptb - M0/W);
    return {b,hm,g,N0,M0,W,ptb,pmax,pmin};
  },
  statement(d) {
    return `Móng băng bề rộng b = <b>${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b>, γ = <b>${d.g} kN/m³</b>.
    <br>Tải tại chân tường: N = <b>${d.N0} kN/m</b>, M = <b>${d.M0} kN.m/m</b>.
    <br>Tính <b>p<sub>max</sub></b> và <b>p<sub>min</sub></b> tại đáy móng.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'W = b²/6 (m²)',  unit:'m²',  answer: d=>d.W,    tol:0.02 },
    { id:'q2', type:'fill', label:'p_tb (kN/m²)',    unit:'kPa', answer: d=>d.ptb,  tol:2 },
    { id:'q3', type:'fill', label:'p_max (kN/m²)',   unit:'kPa', answer: d=>d.pmax, tol:2 },
    { id:'q4', type:'fill', label:'p_min (kN/m²)',   unit:'kPa', answer: d=>d.pmin, tol:2 },
  ]
};

EXERCISES['ch2_b20'] = {
  chapterId: 'ch2',
  title: '2.20 – Tải gây lún (móng chữ nhật, đúng tâm)',
  type: 'guided',
  theoryHTML: `<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">
    <div style="flex:1;min-width:220px">
      <p style="font-weight:700;margin-bottom:6px">Tải gây lún – Áp lực thực sự làm đất lún</p>
      <div style="background:#e8f5e9;border-radius:7px;padding:10px;margin:8px 0;font-family:monospace">
        p<sub>gl</sub> = p<sub>tx</sub> − γ'·h<sub>m</sub><br><br>
        γ': TL riêng của đất trên đáy móng<br>
        (Trước khi xây móng: đất chịu γ'·h<sub>m</sub>)<br>
        Sau khi xây: đất chịu thêm p<sub>gl</sub>
      </div>
    </div>
    <div style="flex:0 0 auto">${svgMong()}</div>
  </div>`,
  hint: 'p_gl = p_tx - γ × h_m. Đây là phần áp lực tăng thêm so với trạng thái ban đầu.',
  genData(rng) {
    const b  = r2(2.6 + rng()*0.5);
    const l  = r2(b*(1+rng()*0.8));
    const hm = r2(1.4 + rng()*0.3);
    const g  = r2(18 + rng()*0.5);
    const N0 = Math.round((55 + rng()*20)*10);  // kN
    const M0 = Math.round((4 + rng()*2)*10)/10;  // kN.m
    const F  = r2(l*b);
    const W  = r2(b*l*l/6);
    const ptb= r2(N0/F + 20*hm);
    const ptx_max = r2(ptb + M0/W);
    const pgl= r2(ptb - g*hm); // dùng p_tb để tính p_gl
    return {b,l,hm,g,N0,M0,F,W,ptb,ptx_max,pgl};
  },
  statement(d) {
    return `Móng hình chữ nhật l×b = <b>${d.l}×${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b>, γ = <b>${d.g} kN/m³</b>.
    <br>Tải tại chân cột: N₀ = <b>${d.N0} kN</b>, M₀ = <b>${d.M0} kN.m</b>.
    <br>Tính <b>tải trọng gây lún</b> p<sub>gl</sub>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'p_tb (kN/m²)',    unit:'kPa', answer: d=>d.ptb,     tol:2 },
    { id:'q2', type:'fill', label:'p_tx_max (kN/m²)',unit:'kPa', answer: d=>d.ptx_max, tol:2 },
    { id:'q3', type:'fill', label:'p_gl (kN/m²)',    unit:'kPa', answer: d=>d.pgl,     tol:2 },
  ]
};

EXERCISES['ch2_b21'] = {
  chapterId: 'ch2',
  title: '2.21 – Tải gây lún (móng băng)',
  type: 'apply',
  theoryHTML: `<div style="background:#e8f5e9;border-radius:7px;padding:10px;margin-bottom:10px;font-family:monospace">
    p<sub>tx</sub> = P₀/b + γ<sub>tb</sub>·h<sub>m</sub><br>
    p<sub>gl</sub> = p<sub>tx</sub> − γ'·h<sub>m</sub>
  </div>
  <p style="font-size:.86rem">Tải gây lún = áp lực tiếp xúc trừ đi ứng suất ban đầu của đất tại đáy móng. P₀ đơn vị T/m = 10 kN/m.</p>`,
  hint: 'Đổi đơn vị T/m → kN/m (×10). Tính p_tx rồi trừ γ × h_m.',
  genData(rng) {
    const b  = r2(2 + rng()*0.5);
    const hm = r2(1.2 + rng()*0.5);
    const g  = r2(18 + rng()*0.5);
    const P0 = Math.round((20 + rng()*5)*10)/10; // kN/m
    const ptx= r2(P0/b + 20*hm);
    const pgl= r2(ptx - g*hm);
    return {b,hm,g,P0,ptx,pgl};
  },
  statement(d) {
    return `Móng hình băng bề rộng b = <b>${d.b} m</b>, chôn sâu h<sub>m</sub> = <b>${d.hm} m</b>, γ = <b>${d.g} kN/m³</b>.
    <br>Tải trọng tại đáy móng: P₀ = <b>${d.P0} kN/m</b>.
    <br>Tính <b>tải trọng gây lún</b> p<sub>gl</sub>.`;
  },
  questions: [
    { id:'q1', type:'fill', label:'p_tx (kN/m²)', unit:'kPa', answer: d=>d.ptx, tol:2 },
    { id:'q2', type:'fill', label:'p_gl (kN/m²)', unit:'kPa', answer: d=>d.pgl, tol:2 },
  ]
};

// ═══════════════════════════════════════════════════════
//  TỔNG HỢP CÔNG THỨC CHƯƠNG 2
// ═══════════════════════════════════════════════════════

EXERCISES['ch2_sum'] = {
  chapterId: 'ch2',
  title: '📋 Tổng hợp công thức – Chương 2',
  type: 'guided',
  theoryHTML: `
<style>
.sum-sec{margin-bottom:18px}
.sum-sec h4{background:var(--primary);color:#fff;padding:6px 14px;border-radius:7px 7px 0 0;margin:0;font-size:.9rem}
.sum-body{border:1px solid var(--primary);border-top:none;border-radius:0 0 7px 7px;padding:12px 16px}
.sum-row{display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;font-size:.85rem;line-height:1.7}
.sum-formula{background:#e3f0fd;border-radius:5px;padding:4px 10px;font-family:monospace;flex-shrink:0;min-width:260px}
.sum-note{color:#555}
</style>

<div class="sum-sec">
  <h4>A. Ứng suất do TLBT – Không MNN</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">Lớp 1: σ_z = z·γ₁</div><div class="sum-note">z ≤ h₁</div></div>
    <div class="sum-row"><div class="sum-formula">Lớp 2: σ_z = h₁γ₁ + (z−h₁)γ₂</div><div class="sum-note">h₁ &lt; z ≤ h₁+h₂</div></div>
    <div class="sum-row"><div class="sum-formula">σ'_z = σ_z (u = 0 khi không MNN)</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>B. Ứng suất có Mực Nước Ngầm (MNN)</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">Trên MNN: σ = σ' = Σhᵢ·γᵢ</div><div class="sum-note">Dùng γ tự nhiên</div></div>
    <div class="sum-row"><div class="sum-formula">Dưới MNN: σ = Σhᵢγᵢ + (z−h_nn)·γ_bh</div></div>
    <div class="sum-row"><div class="sum-formula">u = (z − h_nn)·γ_w  (γ_w = 10 kN/m³)</div></div>
    <div class="sum-row"><div class="sum-formula">σ'_z = σ_z − u</div><div class="sum-note">σ' luôn ≥ 0</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>C. Boussinesq – Tải tập trung P</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">σ_z = (3P/2π)·z³/R⁵</div><div class="sum-note">R = √(r²+z²)</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>D. Tải phân bố đều chữ nhật</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">Tâm: σ_z = k₀·p</div><div class="sum-note">k₀ = f(l/b; z/b)</div></div>
    <div class="sum-row"><div class="sum-formula">Góc: σ_z = k_c·p</div><div class="sum-note">k_c = f(l/b; z/b) – tra bảng góc</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>E. Tải hình băng – Flamant</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">σ_z = k_z·p</div><div class="sum-note">k_z = f(x/b; z/b)</div></div>
    <div class="sum-row"><div class="sum-formula">σ_x = k_x·p</div><div class="sum-note">k_x = f(x/b; z/b)</div></div>
    <div class="sum-row"><div class="sum-formula">τ_xz = k_t·p</div><div class="sum-note">k_t = f(x/b; z/b)</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>F. Ứng suất chính – Hình băng</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">σ₁ = (p/π)(2β + sin 2β)</div><div class="sum-note">ứng suất chính lớn</div></div>
    <div class="sum-row"><div class="sum-formula">σ₃ = (p/π)(2β − sin 2β)</div><div class="sum-note">ứng suất chính nhỏ</div></div>
    <div class="sum-row"><div class="sum-formula">β: góc nhìn từ M tới 2 mép băng [radian!]</div></div>
  </div>
</div>

<div class="sum-sec">
  <h4>G. Tải tiếp xúc & Tải gây lún</h4>
  <div class="sum-body">
    <div class="sum-row"><div class="sum-formula">p_tx = P₀/F + γ_tb·h_m</div><div class="sum-note">Đúng tâm; F=l×b</div></div>
    <div class="sum-row"><div class="sum-formula">p_max/min = p_tb ± M/W</div><div class="sum-note">Lệch tâm</div></div>
    <div class="sum-row"><div class="sum-formula">W = b·l²/6 (chữ nhật); b²/6 (băng)</div></div>
    <div class="sum-row"><div class="sum-formula">p_gl = p_tx − γ'·h_m</div><div class="sum-note">Tải thực sự làm đất lún</div></div>
  </div>
</div>`,
  hint: '',
  genData(rng){ return {}; },
  statement(d){ return 'Xem tổng hợp công thức bên trên – không có câu hỏi tính toán trong bài này.'; },
  questions: []
};
