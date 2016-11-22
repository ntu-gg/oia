台大校級國際交換學生公開資料
=================
台大國際事務處提供的校級交換學生資料皆放置於網頁上，但過濾與搜尋困難，難以尋找需要的資訊，本專案旨在方便同學尋找欲前往交換的學校及條件。

## 待辦事項
 - 各學校各組別篩選條件結構化
    - 組別
    - 語言檢定要求
    - 年級排除條件
    - 學院學系排除條件
 - 網頁版小工具 (選擇自己的身份條件幫你過濾學校)

## 資料格式說明

 - countries.json

```json
[
  {
    "<Country Code>": "<Country Name>"
  }
]
```
- schools.json

```json
[
  {
    "countryCode": "<Country Code>",
    "schoolName": "<School Chinese Name>",
    "schoolUrl": "<School Website URL>",
    "startYear": "<Starting year of contract with NTU, -1 for those coming soon>",
    "contractQuota": "<Quota of contract with NTU>",
    "selectQuota":  "<Min select>",
    "selectQuotaTotal":  "<Max select>",
    "oiaId": "<ID of school in OIA system>"
  }
]
```

## 使用範例

`GET https://oia.ntu.gg/data/schools.json`

## 技術說明

    npm install
    node crawl.js

## 授權
本專案程式碼部分採用 MIT License 釋出，資料部分由台大國際事務處及相關學校所有。
