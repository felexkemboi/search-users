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
import {
  ref, onMounted, watch,
} from 'vue';

export default {
  name: 'UserDetails',
  props: ['name'],
  setup(props) {
    const user = ref({});
    const loading = ref(true);

    const details = () => { window.location.href = `https://api.github.com/users/${props.name}`; };

    const getUser = async () => {
      // eslint-disable-next-line no-restricted-globals
      await axios.get(`https://api.github.com/users/${props.name}?client_id=a18f9351afb2905a618b&client_secret=99218ce6fef8d4200ee9c05d1637365acea1b50d`) // , { headers: { Authorization: 'token 99218ce6fef8d4200ee9c05d1637365acea1b50d' } }
        .then((response) => {
          loading.value = true;
          user.value = response.data;
          loading.value = false;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    };

    // watch(props.name, () => {
    // });

    // watchEffect(() =>
    //   save({
    //     notes: notes.value,
    //     notesArePublic: notesArePublic.value,
    //   })
    // );

    // watch((props.name) => context.root.$route, () => getUser());
    watch(() => props.name, () => {
      getUser();
    });

    onMounted(() => {
      getUser();
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
