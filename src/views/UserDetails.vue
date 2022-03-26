<template>
  <div class="flex items-center justify-center mb-10">
    <div class="card w-72" v-if="!loading">
      <img class="card-img-top" style="radius:50px;" :src="user.avatar_url" />
      <ul class="flex flex-col items-center p-3">
        <li class="list-group-item w-full text-center">
          Repositories: <span class="badge"> {{ user.public_repos }} </span>
        </li>
        <li class="list-group-item w-full text-center">
          Followers: <span class="badge">{{ user.followers }}</span>
        </li>
        <li class="list-group-item w-full text-center">
          Following: <span class="badge"> {{ user.following }} </span>
        </li>
        <li class="list-group-item w-full text-center">
          Description: <span class="badge"> {{ user.bio ?  user.bio : 'No description'}} </span>
        </li>
        <li class="">
          Email: <span class="badge"> {{ user.email }} </span>
        </li>
      </ul>
      <button class="btn" @click="redirect">
        More
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'UserDetails',
  props: ['name'],
  setup(props) {
    const user = ref({});
    const loading = ref(true);

    const details = () => { window.location.href = `https://api.github.com/users/${this.name}`; };

    const getUser = async () => {
      await axios.get(`https://api.github.com/users/${this.name}`, { headers: { Authorization: 'token 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' } })
        .then((response) => {
          this.loading = true;
          this.user = response.data;
          this.loading = false;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    };

    watch(props.name, () => {
      this.getUser();
    });

    onMounted(() => {
      this.getUser();
    });
    return {
      user,
      loading,
      getUser,
      details,
    };
  },
};
</script>
