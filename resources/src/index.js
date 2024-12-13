import {style} from "./package/styles.js";
import {settings} from "./package/settings.js";
import {validasidata} from "./package/validasidata.js";
import {loadplugin} from "./loadplugins";
import Swal from 'sweetalert2';


async function initialize() {
    try {
        await loadplugin();
        $(document).ready(function () {
            settings();
            style();
            validasidata(Swal);

        });
    } catch (error) {
        Swal.close()
    }
}

initialize();