# JSON in JSX

## install (needs NodeJS)

```bash
# place in /CEP/extensions/
git clone https://github.com/Inventsable/JSON-in-JSX-example.git

# Install node dependencies
npm install

# Launch developer context for panel
npm run serve

# Launch Illustrator and find in Windows > Extensions. Must do above steps before launching Illustrator!
```

## Using the [same code provided here](https://community.adobe.com/t5/illustrator/parsing-json-in-adobe-illustrator-extended-panel/m-p/10841051)

```js
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
```

### Important files are:

- ./src/json2.jsx
- ./src/productTemplateSetup.jsx
- ./src/App.vue (HTML/JS/CSS logic for the panel itself)