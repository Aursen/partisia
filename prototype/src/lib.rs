#[macro_use]
extern crate pbc_contract_codegen;
extern crate pbc_contract_common;

use pbc_contract_common::{
    address::{Address, AddressType, Shortname},
    context::ContractContext,
    events::EventGroup,
    zk::{ZkInputDef, ZkState},
    Hash,
};
use read_write_rpc_derive::ReadWriteRPC;
use read_write_state_derive::ReadWriteState;
use std::collections::BTreeMap;

const PROFILE_PROGRAM_ADDRESS: Address = Address {
    address_type: AddressType::PublicContract,
    identifier: [
        0x97, 0xa0, 0xe2, 0x38, 0xe9, 0x24, 0x02, 0x5b, 0xad, 0x14, 0x4a, 0xa0, 0xc4, 0x91, 0x3e,
        0x46, 0x30, 0x8f, 0x9a, 0x4d,
    ],
};

#[state]
struct ContractState {
    owner: Address,
    questions: BTreeMap<Hash, String>,
    answers: BTreeMap<Hash, BTreeMap<Address, String>>, //replace with bytes
}

impl ContractState {
    fn add_answer(&mut self, question_id: Hash, user: Address, answer: String) {
        let answers = self
            .answers
            .get_mut(&question_id)
            .expect("The question does not exist!");

        answers.insert(user, answer);
    }
}

#[derive(ReadWriteState, ReadWriteRPC, Debug)]
struct SecretVarMetadata {
    secret_key: u128,
}

// Connais pas la taille pour le moment.
const BITLENGTH_OF_SECRET_KEY: u32 = 128;

#[init]
fn initialize(ctx: ContractContext, _zk_state: ZkState<SecretVarMetadata>) -> ContractState {
    ContractState {
        owner: ctx.sender,
        questions: BTreeMap::new(),
        answers: BTreeMap::new(),
    }
}

#[zk_on_secret_input(shortname = 0x40)]
fn set_secret_key(
    _context: ContractContext,
    state: ContractState,
    zk_state: ZkState<SecretVarMetadata>,
) -> (
    ContractState,
    Vec<EventGroup>,
    ZkInputDef<SecretVarMetadata>,
) {
    assert!(
        zk_state.secret_variables.len() >= 1,
        "Can't add another key"
    );

    let input_def = ZkInputDef {
        seal: false,
        metadata: SecretVarMetadata { secret_key: 0 },
        expected_bit_lengths: vec![BITLENGTH_OF_SECRET_KEY],
    };

    (state, vec![], input_def)
}

#[action(shortname = 0x01)]
fn add_question(
    ctx: ContractContext,
    mut state: ContractState,
    _zk_state: ZkState<SecretVarMetadata>,
    question: String,
) -> ContractState {
    assert!(
        ctx.sender == state.owner,
        "Only the owner of the contract can add new question"
    );

    state.questions.insert(ctx.current_transaction, question);
    state
        .answers
        .insert(ctx.current_transaction, BTreeMap::new());

    state
}

#[action(shortname = 0x02)]
fn add_answer(
    ctx: ContractContext,
    mut state: ContractState,
    _zk_state: ZkState<SecretVarMetadata>,
    question: Hash,
    answer: String,
) -> (ContractState, Vec<EventGroup>) {
    assert!(
        ctx.sender.address_type == AddressType::Account,
        "The user is not an account"
    );

    let mut event_group = EventGroup::builder();

    event_group
        .call(PROFILE_PROGRAM_ADDRESS, Shortname::from_u32(1))
        .argument(ctx.sender)
        .done();

    //TODO encryption
    state.add_answer(question, ctx.sender, answer);

    (state, vec![event_group.build()])
}
