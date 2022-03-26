<template>
  <div class="home">
    <h1 class="title" id="title">Search Github users</h1>
    <form class="form">
        <input  class="input" type="text"   placeholder="Type the name" v-model="search">
        <button class="btn"   type="button" @click="getUsers">Search</button>
    </form>
    <div class="p-5" v-if="users.length">
        Users found: {{ count }}
    </div>
    <ul v-if="users.length">
        <div class="users">
            <li v-for="(user,index) in users" :key="index" class="li">
                <div class="name">
                  {{ user.login }}
                </div>
                <div class="details">
                  <user-details  :name="user.login" />
                </div>
            </li>
        </div>
    </ul>
    <div v-if="users.length" class="buttons">
      <button @click="paginate('previous')" class="btn" :class="disablePrevious">Previous</button>
      <button @click="paginate('next')"     class="btn" :class="disableNext">Next</button>
    </div>
  </div>
</template>

<script>

import { ref, computed, watch } from 'vue';

import axios from 'axios';
import UserDetails from './UserDetails.vue';

export default {
  name: 'GithubUsers',
  components: {
    UserDetails,
  },
  setup() {
    const search = ref('');
    const users = ref([]);
    const count = ref(0);
    const page = ref(1);

    const paginate = (value) => {
      if (value === 'next') {
        page.value += 1;
        // eslint-disable-next-line no-use-before-define
        getUsers();
      } else {
        page.value -= 1;
        // eslint-disable-next-line no-use-before-define
        getUsers();
      }
    };

    const getUsers = async () => {
      await axios.get(`https://api.github.com/search/users?q=${search.value}&page=${page.value}&per_page=12`, { headers: { Authorization: 'token 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' } })
        .then((response) => {
          users.value = response.data.items;
          count.value = response.data.total_count;
        })
        .catch((error) => {
        // eslint-disable-next-line no-console
          console.error(error);
        });
    };

    const disableNext = computed(() => ((page * 12) >= count ? 'cursor-not-allowed' : ''));

    const disablePrevious = computed(() => (page <= 1 ? 'cursor-not-allowed' : ''));

    watch(page, () => {
      getUsers();
    });

    return {
      search,
      users,
      count,
      page,
      paginate,
      getUsers,
      disableNext,
      disablePrevious,
    };
  },
};
</script>
