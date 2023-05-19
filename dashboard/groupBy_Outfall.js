// Groups outfall assessments by unique structure number
// Reference: https://github.com/Esri/arcade-expressions/blob/master/dashboard_data/GroupByMultiStats(List).md

var portal = Portal('https://www.arcgis.com/');
var fs = FeatureSetByPortalItem(
    portal,
    '0f6acdd5b0f24f239dcddef43635c8b9',
    0,
    [
        'REGIME',
        'REL_SHA_STR_NO',
        'REL_STRUCTURE_ID',
        'REL_GLOBALID'
    ],
    false
);

return GroupBy(fs, ['REGIME','REL_SHA_STR_NO'], 
[{name: 'total_str_no', expression: 'REL_SHA_STR_NO', statistic: 'COUNT' }, 
 {name: 'total_str_id', expression: 'REL_STRUCTURE_ID', statistic: 'COUNT' },
 {name: 'total_guid', expression: 'REL_GLOBALID', statistic: 'COUNT' }]); 
