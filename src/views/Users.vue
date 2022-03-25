<template>
    <div class="home">
        <div class="mx-4 flex flex-col p-4 text-center items-center">
            <h1 class="text-2xl">Search Github users</h1>
            <form class="form">
                <input  class="input" type="text"   placeholder="Type the name" v-model="search">
                <button class="btn"   type="button" @click="getUsers">Search</button>
            </form>
            <div class="p-5" v-if="users.length">
                Users found: {{ count }}
            </div>
            <ul v-if="users.length" >
                <div class="users">
                    <li v-for="(user,index) in users" :key="index" class="bg-gray-200">
                        <div class="p-5 text-center">
                            {{ user.login }}
                        </div>
                        <div class="p-2 text-center">
                            <user-details :name=user.login />
                        </div>
                    </li>
                </div>
            </ul>
            <div v-if="users.length" class="flex flex-row space-y-4">
              <div>
                <button
                  class="btn space-x-2"
                  type="button"
                  @click="previous"
                  :disabled="page<1">Previous
                </button>
              </div>
              <div>
                <button
                  class="btn"
                  type="button"
                  @click="next">Next</button>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import UserDetails from './UserDetails.vue';

export default {
  name: 'GithubUsers',
  components: {
    UserDetails,
  },
  data() {
    return {
      users: [],
      count: 0,
      search: '',
      page: 1,
    };
  },
  watch: {
    page() {
      this.getUsers();
    },
  },
  computed: {
    disableNext() {
      return this.count;
    },
    disablePrevious() {
      return this.page <= 1;
    },
  },
  methods: {
    details(user) {
      this.$router.push({ name: 'user', params: { user } });
    },
    next() {
      this.page += 1;
      this.getUsers();
    },
    previous() {
      if (this.page > 1) {
        this.page -= 1;
        this.getUsers();
      } else {
        // eslint-disable-next-line no-alert
        alert('You are in page 1');
      }
    },
    async getUsers() {
      await axios.get(`https://api.github.com/search/users?q=${this.search}&page=${this.page}&per_page=10`, { headers: { Authorization: 'token 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' } })
      // page=${this.page}&
        .then((response) => {
          this.users = response.data.items;
          this.count = response.data.total_count;
          // eslint-disable-next-line no-console
          console.log(response.data.total_count);
        })
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.error(error);
        });
    },
  },
};
</script>
