// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// This example demonstrates a basic use of a shared object.
/// Rules:
/// - anyone can create a campaign
/// - recepient can receive funds from the campaign


module contracts::reach_contract {

    use sui::table::{Self, Table};
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use std::string::{Self, String};
    use sui::transfer;
    use sui::event::emit;
    use sui::sui::SUI;
    use sui::url::{Self, Url};
    use sui::balance::{Self, Balance};
    

    struct Campaign has key, store {
        id: UID,
        creator: address,
        budget: Balance<SUI>,
        start_date: u64,
        end_date: u64,
        name: String,
        description: String,
        title: String,
        total_views: u64,
        total_clicks: u64,
        image_url: Url,
        link_url: Url
    }

    const campaign_table = Table::new<UID, Campaign>();


    public entry fun create_campaign(
        _name: String,
        _title: String,
        _description: String,
        _image_url: Url,
        _link_url: Url,
        _start_date: u64,
        _end_date: u64,
        _budget: Balance<SUI>,
        ctx: &mut TxContext) {

        let new_campaign = Campaign {
            id: object::new(ctx),
            creator: tx_context::sender(ctx),
            budget: _budget,
            start_date: _start_date,
            end_date: _end_date,
            name: _name,
            description: _description,
            title: _title,
            total_views: 0,
            total_clicks: 0,
            image_url: _image_url,
            link_url: _link_url
        };
        campaign_table::add(new_campaign.id, new_campaign);
        emit(new_campaign.id, new_campaign)
        transfer::share_object(new_campaign);
    } 

}
