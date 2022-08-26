import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .alterTable('Chats', (t) => {
      t.dropForeign('owner_id');
    })
    .alterTable('Chats', (t) => {
      t.dropForeign('user_id');
    })
    .alterTable('Messages', (t) => {
      t.dropForeign('owner_id');
    })
    .alterTable('Comments', (t) => {
      t.dropForeign('owner_id');
    })
    .alterTable('Purchases', (t) => {
      t.dropForeign('user_id');
    })
    .alterTable('PushNotifications', (t) => {
      t.dropForeign('user_id');
    })
    .alterTable('Restaurants', (t) => {
      t.dropForeign('owner_id');
    })
    .alterTable('Orders', (t) => {
      t.dropForeign('user_id');
    })
    .dropTable('Tokens')
    .dropTable('Passkeys_Authenticator')
    .dropTable('User_Passwords')
    .dropTable('User_Passkeys')
    .dropTable('Users');
}

export async function down(knex: Knex): Promise<void> {}
