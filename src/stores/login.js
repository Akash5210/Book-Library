import { ref, onMounted } from 'vue';
import { userStateListener } from '../firebase';

const state = ref({
  user: null,
});


onMounted(() => {
  userStateListener((user) => {
    state.value.user = user;
  });
});
