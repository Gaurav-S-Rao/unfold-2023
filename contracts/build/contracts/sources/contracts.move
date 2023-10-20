// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// This example demonstrates a basic use of a shared object.
/// Rules:
/// - anyone can create a campaign
/// - recepient can receive funds from the campaign
module contracts::contracts {
    use sui::transfer;
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};

    /// A campaign.
    struct Campaign has key, store {
        id: UID,
        name: vector<u8>,
        title: vector<u8>,
        description: vector<u8>,
        campaign_owner: address,
        views: u64,
        clicks: u64,
        startDate: vector<u8>,
        endDate: vector<u8>,
        createdAt: vector<u8>,
        updatedAt: vector<u8>,
        cost: Balance<SUI>,
    }

    /// Create and share a Campaign and Advertisement.
    public entry fun create_campaign(
        _name: vector<u8>, 
        _title: vector<u8>,
        _description: vector<u8>,
        _startDate: vector<u8>,
        _endDate: vector<u8>,
        _createdAt: vector<u8>,
        _updatedAt: vector<u8>,
        c: Coin<SUI>,
        ctx: &mut TxContext) {

        let b = coin::into_balance(c);

        transfer::share_object(Campaign {
            id: object::new(ctx),
            name: _name,
            title: _title,
            description: _description,
            campaign_owner: tx_context::sender(ctx),
            views: 0,
            clicks: 0,
            startDate: _startDate,
            endDate: _endDate,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            cost: b,
        });

    }

    public entry fun distribute_amount(
        campaign:&mut Campaign,
        recipient: address,
        amount: u64,
        ctx: &mut TxContext) {

        let coin_to_split = coin::take(&mut campaign.cost, amount, ctx);

        transfer::public_transfer(coin_to_split, recipient);

    }

}

// #[test_only]
// module basics::counter_test {
//     use sui::test_scenario;
//     use basics::counter;

//     #[test]
//     fun test_counter() {
//         let owner = @0xC0FFEE;
//         let user1 = @0xA1;

//         let scenario_val = test_scenario::begin(user1);
//         let scenario = &mut scenario_val;

//         test_scenario::next_tx(scenario, owner);
//         {
//             counter::create(test_scenario::ctx(scenario));
//         };

//         test_scenario::next_tx(scenario, user1);
//         {
//             let counter_val = test_scenario::take_shared<counter::Counter>(scenario);
//             let counter = &mut counter_val;

//             assert!(counter::owner(counter) == owner, 0);
//             assert!(counter::value(counter) == 0, 1);

//             counter::increment(counter);
//             counter::increment(counter);
//             counter::increment(counter);
//             test_scenario::return_shared(counter_val);
//         };

//         test_scenario::next_tx(scenario, owner);
//         {
//             let counter_val = test_scenario::take_shared<counter::Counter>(scenario);
//             let counter = &mut counter_val;

//             assert!(counter::owner(counter) == owner, 0);
//             assert!(counter::value(counter) == 3, 1);

//             counter::set_value(counter, 100, test_scenario::ctx(scenario));

//             test_scenario::return_shared(counter_val);
//         };

//         test_scenario::next_tx(scenario, user1);
//         {
//             let counter_val = test_scenario::take_shared<counter::Counter>(scenario);
//             let counter = &mut counter_val;

//             assert!(counter::owner(counter) == owner, 0);
//             assert!(counter::value(counter) == 100, 1);

//             counter::increment(counter);

//             assert!(counter::value(counter) == 101, 2);

//             test_scenario::return_shared(counter_val);
//         };
//         test_scenario::end(scenario_val);
//     }
// }