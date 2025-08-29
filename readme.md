# Installation
### 1. Head to ox_inventory/fxmanifest.lua and add the following line inside "files" section:
    'web/build/fonts/*.otf',

### It must look something like this:
```
files {
    'client.lua',
    'server.lua',
    'locales/*.json',
    'web/build/index.html',
    'web/build/assets/*.js',
    'web/build/assets/*.css',
    'web/build/fonts/*.otf',
    'web/images/*.png',
    'modules/**/shared.lua',
    'modules/**/client.lua',
    'modules/bridge/**/client.lua',
    'data/*.lua',
}
```

### 2. Replace ox_inventory/web/build folder with the one provided in the zip file

### Full credits to ox team who made [ox_inventory](https://github.com/overextended/ox_inventory) from scratch

### 🔥 Check us out at https://overflow5m.com/