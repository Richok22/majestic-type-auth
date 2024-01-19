<template>
  <div class="intro-container" @keydown.enter="startAnimation" :class="{ 'hide': !visible }" tabindex="0">
    <div class="intro-text">
      <h2 :class="{ 'fly-up': animateH2 }">Evolution DM</h2>
      <p :class="{ 'fly-down': animateP }">Нажмите <img src="/src/assets/img/enter.svg" alt="enter key" class="intro-icon"> чтобы начать </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    onAnimationFinished: Function,
  },
  setup(props) {
    const animateH2 = ref(false);
    const animateP = ref(false);
    const visible = ref(true);

    const startAnimation = () => {
      if (event.key === 'Enter') {
        animateH2.value = true;
        animateP.value = true;
        setTimeout(() => {
          visible.value = false;
<<<<<<< HEAD
          props.onAnimationFinished(); // Emit the event directly
=======
          props.onAnimationFinished();
>>>>>>> 8fcb3449419c3401b43597f6b57b331bd8fc567e
        }, 1000);
      }
    };

    return { animateH2, animateP, visible, startAnimation };
  },
};
</script>
<<<<<<< HEAD

<style scoped>
/* Your existing styles */
</style>

=======
>>>>>>> 8fcb3449419c3401b43597f6b57b331bd8fc567e
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.intro-container {

  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.intro-text h2 {
  font-size: 67px;
  font-style: italic;
}

.intro-text p {
  padding-top: 3px;
  font-family: var(--IntegratedFont),sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 27px;
  text-transform: uppercase;
  white-space: nowrap;
}

.intro-icon {
  padding-top: 20px;
  width: 48px;
  height: 48px;
}
.fly-up {
  animation: flyUp 1s forwards;
}

.fly-down {
  animation: flyDown 1s forwards;
}


@keyframes flyUp {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
}

@keyframes flyDown {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
</style>
