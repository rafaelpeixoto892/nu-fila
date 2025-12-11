// document.addEventListener('DOMContentLoaded', async () => {
//     const environments = {
//         "localhost:8080": {
//             name: "local",
//             searchApi: `${window.wpApiSettings.root}blogbb/v2/search`,
//             tagsApi: `${window.wpApiSettings.root}blogbb/v2/tags`,
//         },
//         "blog.web.desenv.bb.com.br": {
//             name: "desenv",
//             searchApi: `${window.wpApiSettings.root}blogbb/v2/search`,
//             tagsApi: `${window.wpApiSettings.root}blogbb/v2/tags`,
            
//         },
//         "blog.web.hm.bb.com.br": {
//             name: "hml",
//             searchApi: `${window.wpApiSettings.root}blogbb/v2/search`,
//             tagsApi: `${window.wpApiSettings.root}blogbb/v2/tags`,
//         },
//         "blog.web.intranet.bb.com.br": {
//             name: "intranet",
//             searchApi: `${window.wpApiSettings.root}blogbb/v2/search`,
//             tagsApi: `${window.wpApiSettings.root}blogbb/v2/tags`,
//         },
//     };

//     const defaultEnvironment = {
//         name: "intranet",
//         searchApi: `${window.wpApiSettings.root}blogbb/v2/search`,
//         tagsApi: `${window.wpApiSettings.root}blogbb/v2/tags`,
//     };

//     const currentHost = window.wpApiSettings.root;
//     const currentEnv = environments[currentHost] || defaultEnvironment;

//     window.searchApi = currentEnv.searchApi;
//     window.tagsApi = currentEnv.tagsApi;
//     window.environmentName = currentEnv.name;

//     console.log(`Ambiente atual: ${window.environmentName}`);
//     console.log(`URL da search api: ${window.searchApi}`);
//     console.log(`URL da tags api: ${window.tagsApi}`);
// });
