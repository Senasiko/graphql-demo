<template>
  <div class="home">
    <h3>apollo in options</h3>
    userName: {{ user && user.name }}

    <h3>mutation</h3>
    <form>
      username: <input type="text" v-model="formData.name"><br>
      password: <input type="password" v-model="formData.password"><br>
      <button type="button" @click="login">登录</button>
    </form>
    <h3>subscriptions messages</h3>
    <input type="text" v-model="message">
    <button type="button" @click="send">发送</button>
    <ul>
      <li v-for="message in messages" :key="message.content">{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import USER from '../graphql/queries/User.gql';
import LOGIN from '../graphql/mutations/Login.gql';
import SEND_MESSAGE from '../graphql/mutations/Message.gql';
import MESSAGE from '../graphql/subscriptions/Message.gql';

export default {
  name: 'home',
  apollo: {
    user: {
      query: USER,
      variables() {
        return {
          id: this.userId,
        };
      },
    },
    $subscribe: {
      messageAdded: {
        query: MESSAGE,
        variables() {
          return {
            id: this.userId,
          };
        },
        skip() {
          return !this.userId;
        },
        result({ data }) {
          this.messages.push(data.messageAdded.content);
        },
      },
    },
  },
  data() {
    return {
      skip: true,
      messages: [],
      userId: null,
      formData: {
        name: 'test1',
        password: '123456',
      },
      message: '',
    };
  },
  methods: {
    async login() {
      try {
        const { data: { login: u } } = await this.$apollo.mutate({
          mutation: LOGIN,
          variables: this.formData,
        });
        this.userId = u.id;
      } catch (e) {
        alert(e);
      }
    },
    send() {
      this.$apollo.mutate({
        mutation: SEND_MESSAGE,
        variables: {
          to: this.userId === '1' ? '2' : '1',
          from: this.userId,
          content: this.message,
        },
      });
    },
  },
};
</script>
