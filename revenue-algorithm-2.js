const CLICK_WEIGHT = 0.6
const VIEW_WEIGHT = 0.4

const PLATFORM_FEE = 0.1 // 10%
const COST_PER_CLICK = {
  "defi": 0.1, // 0.1 USD
  "gaming": 0.05, // 0.05 USD
  "trading": 0.11, // 0.11 USD
  "nft": 0.23, // 0.23 USD
}

const COST_PER_VIEW = {
  "defi": 0.03, // 0.03 USD
  "gaming": 0.02, // 0.02 USD
  "trading": 0.04, // 0.04 USD
  "nft": 0.08, // 0.08 USD
}

const ADVERTISERS = [
  {
    "id": "advertiser_1",
    "name": "Lamarack Ma"
  },
  {
    "id": "advertiser_2",
    "name": "John Doe"
  }
]

const ADVERTISER_CAMPAIGNS = [
  {
    "id": "campaign_1",
    "advertiser_id": "advertiser_1",
    "category": "defi",
    "budget": 30, // 30 USD
    "start_date": "2021-10-01",
    "end_date": "2021-10-31",
  },
  {
    "id": "campaign_2",
    "advertiser_id": "advertiser_2",
    "category": "gaming",
    "budget": 10, // 10 USD
    "start_date": "2021-10-15",
    "end_date": "2021-10-31",
  },
  {
    "id": "campaign_3",
    "advertiser_id": "advertiser_1",
    "category": "trading",
    "budget": 14, // 14 USD
    "start_date": "2022-1-2",
    "end_date": "2022-1-12",
  }
];

const PUBLISHERS = [
  {
    "id": "publisher_1",
    "publisher_name": "Jane Doe",
    "category": "defi",
    "ads": [
      {
        "campaign_id": "campaign_1",
        "clicks": 5,
        "views": 8,
      },
      {
        "campaign_id": "campaign_3",
        "clicks": 8,
        "views": 10,
      }
    ]
  },
  {
    "id": "publisher_2",
    "publisher_name": "Mia Micheals",
    "category": "gaming",
    "ads": [
      {
        "campaign_id": "campaign_1",
        "clicks": 3,
        "views": 9,
      },
      {
        "campaign_id": "campaign_2",
        "clicks": 10,
        "views": 20,
      }
    ]
  }
]

// --------------------------------------------------------------------------------
const CPC = 3 // 3 INR
const CPV = 1 // 1 INR

const click_wt = 0.6
const view_wt = 0.4

const clicks = 10
const views = 25

const weighted_cost = (clicks * CPC * click_wt) + (views * CPV * view_wt)
console.log("Weighted Cost: " + weighted_cost + " INR")

const total_cost = (clicks * CPC) + (views * CPV)
console.log("Total Cost: " + total_cost + " INR")
// --------------------------------------------------------------------------------