export const HomePageFilters = [
    {name:"Latest",value:"newest"},
    {name:"Unanswered",value:"unanswered"},
    {name:"Popular",value:"popular"},
    {name:"Recommended",value:"recommended"}
];

export const AnswerFilters = [
    {name:"Latest",value:"latest"},
    {name:"Oldest",value:"oldest"},
    {name:"Popular",value:"popular"},
];

export const CollectionFilters = [
    {name:"Most Recent",value:"mostrecent"},
    {name:"Oldest",value:"oldest"},
    {name:"Most Vote",value:"mostvoted"},
    {name:"Most Answer",value:"mostanswered"},
];

export const TagFilters = [
    {name:"A-Z",value:"name"},
    {name:"Newest",value:"newest"},
    {name:"Oldest",value:"oldest"},
    {name:"Popular",value:"popular"},
];

export const UserFilters = [
    {name:"Newest",value:"newest"},
    {name:"Oldest",value:"oldest"},
    {name:"Popular",value:"popular"},
]

export const DefaultFilters = {
    HomePageFilters:"unanswered",
    AnswerFilters: "latest",
    CollectionFilters: "mostrecent",
    TagFilters:"name",
    UserFilters: "newest"
} as const;




