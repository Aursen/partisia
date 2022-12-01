//! profile

#[macro_use]
extern crate pbc_contract_codegen;

use std::collections::BTreeMap;

use create_type_spec_derive::CreateTypeSpec;
use pbc_contract_common::address::{Address, AddressType};
use pbc_contract_common::context::ContractContext;
use read_write_rpc_derive::ReadWriteRPC;
use read_write_state_derive::ReadWriteState;

#[state]
struct ContractState {
    users: BTreeMap<Address, UserProfile>,
}

#[derive(ReadWriteRPC, ReadWriteState, Clone, PartialEq, CreateTypeSpec, Debug)]
struct UserProfile {
    user_type: u8,
    answer_cost: u64,
    allowance: u64,
}

#[init]
fn initialize(_ctx: ContractContext) -> ContractState {
    let state = ContractState {
        users: BTreeMap::new(),
    };

    state
}

#[action(shortname = 0x01)]
fn init_profile_if_needed(
    context: ContractContext,
    mut state: ContractState,
    new_user: Address,
) -> ContractState {
    assert!(
        context.sender.address_type == AddressType::PublicContract,
        "This function need to be called by a contract"
    );
    assert!(
        state.users.contains_key(&new_user),
        "Cannot init a new profile for this user"
    );

    state.users.insert(
        new_user,
        UserProfile {
            user_type: 0,
            answer_cost: 0,
            allowance: 0,
        },
    );

    state
}

#[action(shortname = 0x02)]
fn set_answer_cost(
    context: ContractContext,
    mut state: ContractState,
    new_cost: u64,
) -> ContractState {
    let user_profile = state
        .users
        .get_mut(&context.sender)
        .expect("Cannot find the user");

    user_profile.answer_cost = new_cost;

    state
}
