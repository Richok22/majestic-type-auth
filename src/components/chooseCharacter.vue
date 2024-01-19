<script setup>
const props = defineProps({
  character: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>

<template>
  <div class="character_choose">
    <div class="choose">
      <div v-if="Object.keys(character).length" class="choose_stats">
        <div class="name_static">
          <div class="choose_lvl">
            <h2 style="font-size: 33px">{{character.lvl}}</h2>
            <p>Уровень</p>
          </div>
          <h2>{{character.name}}</h2>
          <p class="static">#{{character.static}}</p>
        </div>
        <div class="statuses">
          <p class="status_name">Статус персонажа:</p>
          <p class="status" v-if="!character.isAdmin">Игрок</p>
          <p class="status" v-if="character.isAdmin">Администратор</p>
        </div>
        <div class="cash">
          <h2 class="money"><img class="choose_icon" src="/src/assets/img/white-empty-wallet-svgrepo-com.svg"> ${{character.cash}}</h2>
          <h2 class="money"><img class="choose_icon" src="/src/assets/img/credit-card.svg"> ${{character.bank_cash}}</h2>
        </div>
      </div>
      <div v-else>
        <div class="create_char">
          <img width="60" src="/src/assets/img/user.svg">
          <h2>СВОБОДНЫЙ СЛОТ</h2>
          <p>СОЗДАЙТЕ ПЕРСОНАЖА</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.character_choose {
  margin-top: 70vh;
  justify-content: center;
  display: flex;
  align-items: center;
}

.choose {
  margin-left: 30px;
  min-width: 40vh;
  min-height: 23vh;
  background-color: #1e1f1f;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.choose:hover {
  transform: scale(1.05); /* Scale the item to 105% when hovered */
}

.choose_stats {
  padding: 10px 30px 10px 30px;
}

.status, .static {
  margin-top: 3px;
}

p {
  font-size: 14px;
  color: #62676a;
  font-weight: 600;
}


.status {
  padding-top: 5px;
  font-size: 13.5px;
  color: #ffffff;
}


.status_name, .static {
  font-size: 13.5px;
  color: #62676a;
}

.choose_icon {
  width: 16px;
}

.cash {
  margin-top: 20px;
}

.money {
  padding-top: 10px;
  font-size: 14.5px;
}

.choose_lvl {
  float: right;
  text-align: center;
}

.create_char {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.create_char p {
  margin-top: 14px ;
}


</style>
