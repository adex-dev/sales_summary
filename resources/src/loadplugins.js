function loadJS(FILE_URL) {
    return new Promise((resolve, reject) => {
        let dynamicScript = document.createElement("script");
        dynamicScript.src = FILE_URL;

        dynamicScript.onload = resolve;
        dynamicScript.onerror = reject;

        document.body.appendChild(dynamicScript);
    });
}

function loadCSS(FILE_URL) {
    return new Promise((resolve, reject) => {
        let dynamicStylesheet = document.createElement("link");
        dynamicStylesheet.href = FILE_URL;
        dynamicStylesheet.rel = "stylesheet";

        dynamicStylesheet.onload = resolve;
        dynamicStylesheet.onerror = reject;

        document.head.appendChild(dynamicStylesheet);
    });
}

export async function loadplugin() {

    let to_build = page+"/";
    try {
        await loadCSS(to_build + "resources/vendors/bootstrap/bootstrap.min.css");
        await loadCSS(to_build + "resources/vendors/bootstrap/styles.css");
        await loadJS(to_build + "resources/vendors/bootstrap/bootstrap.min.js");
        await loadCSS(to_build + "resources/vendors/boxicons/css/animations.css");
        await loadCSS(to_build + "resources/vendors/boxicons/css/boxicons.css");
        await loadCSS(to_build + "resources/vendors/boxicons/css/transformations.css");
        await loadJS(to_build + "resources/vendors/jam/buttons.js");
        await loadJS(to_build + "resources/vendors/jam/jam.js");
        if ($(".select-single").length || $(".select-multiple").length) {
            await loadCSS(to_build + "resources/vendors/choise/choices.css");
        await loadJS(to_build + "resources/vendors/choise/choices.js");
            await loadCSS(to_build + "resources/vendors/jam/jam.min.css");
            await loadJS(to_build + "resources/vendors/popper/popper.min.js");
            const selectsingle = document.querySelector('.select-single'); // Ganti dengan elemen yang sesuai
            const Choices = new Choices(selectsingle, {
                searchEnabled: true,
                itemSelectText: '',
                removeItemButton: true,
                placeholder: true,
                searchChoices: true,
                shouldSort: true,
                position: 'auto',
            });
            const select_multiple = document.querySelector('.select-multiple'); // Ganti dengan elemen yang sesuai
            const choices = new Choices(select_multiple, {
                removeItemButton: true,  // Menampilkan tombol hapus (hapus pilihan)
                searchEnabled: true,     // Mengaktifkan fitur pencarian (optional)
                duplicateItems: false,
                placeholder: true,
                searchChoices: true,
                shouldSort: true,
                paste: true,
                delimiter: ',',
                position: 'auto',
                resetScrollPosition: true,
                silent: true,
                removeItems: true,
            });

        }

    } catch (error) {
        throw error;
    }
}