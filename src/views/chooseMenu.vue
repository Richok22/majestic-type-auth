<template>
  <div class="chooseMenu_container">
<!--   TODO Account log out and settings-->
    <div class="character_choose">
      <choose-character v-for="character of chooseMenuStores.characters" :key="character.static" :character="character"></choose-character>
    </div>
  </div>
</template>

<script>
import {useChooseMenuStores} from '@/stores/chooseMenuStores.js';
import ChooseCharacter from "@/components/chooseCharacter.vue";

export default {
  components: { ChooseCharacter},
  setup() {
    const chooseMenuStores = useChooseMenuStores();

    console.log(chooseMenuStores.characters)

    return {chooseMenuStores}
  }
}

</script>

<style scoped>

.character_choose {
  display: flex;
  justify-content: center;
}

</style>
