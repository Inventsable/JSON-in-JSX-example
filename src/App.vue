<template>
  <div id="app">
    <menus />
    <button @click="clickAndRespond">Click me</button>
    <span v-if="response" class="response">{{response}}</span>
  </div>
</template>

<script>
import starlette from "starlette";

export default {
  name: "app",
  data: () => ({
    response: null
  }),
  components: {
    menus: require("./components/Menus.vue").default
  },
  mounted() {
    console.clear();
    starlette.init();
  },
  methods: {
    clickAndRespond() {
      const csiRun = new CSInterface();
      const root = decodeURI(csiRun.getSystemPath("extension")).replace(
        /file:\/{1,}/,
        ""
      );
      const json2File = `${root}/src/json2.jsx`;
      const productTemplateSetupFile = `${root}/src/productTemplateSetup.jsx`;
      csiRun.evalScript(`$.evalFile('${json2File}')`);
      csiRun.evalScript(`$.evalFile('${productTemplateSetupFile}')`);

      const someData = ["john", "bar", "son", "datto"];
      csiRun.evalScript(
        `setupPlateTemplate('${JSON.stringify(someData)}')`,
        val => {
          this.response = JSON.parse(val);
        }
      );
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans&display=swap");
:root {
  background-color: var(--color-bg);
  color: var(--color-default);
  font-family: "Open Sans", sans-serif;
  font-size: 10px;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 99vh;
  width: 100%;
  flex-wrap: wrap;
}

#app::-webkit-scrollbar {
  display: block;
}
body::-webkit-scrollbar {
  width: 0px;
}
.response {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}

::-webkit-scrollbar {
  background-color: var(--color-scrollbar);
  width: var(--width-scrollbar-track);
}
::-webkit-scrollbar-thumb {
  width: var(--width-scrollbar-track);
  background: var(--color-scrollbar-thumb);
  border-radius: var(--radius-scrollbar-thumb);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-scrollbar-thumb-hover);
}
::-webkit-scrollbar-resizer {
  display: none;
  width: 0px;
  background-color: transparent;
}
::-webkit-scrollbar-button {
  height: 0px;
}
::-webkit-scrollbar-corner {
  display: none;
}
</style>
