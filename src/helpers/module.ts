const importDynamic = new Function('modulePath', 'return import(modulePath)');

export { importDynamic };
