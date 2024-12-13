import {pesan} from "./alert.js";

export function proses_data(form, url, aksi, Swal) {
    let warning = "", actions = "", Commanders = null;
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST", url: url, data: form, cache: false, async: true, dataType: "json",
            success: async (response, textdata, jqXHR) => {
                if (response) {
                    if (response.message) {
                        warning = response.message;
                    } else if (response.messages) {
                        warning = response.messages;
                    } else {
                        warning = response.error || "No warning message provided";
                    }
                } else {
                    warning = `No response data received.  ${textdata}`;
                }
                switch (jqXHR.status) {
                    case 404:
                        actions = "errors";
                        Commanders = () => resolve();
                        await PopupInfor(warning, actions, Swal, Commanders)
                        break;
                    case 204:
                        actions = "warning";
                        Commanders = () => resolve();
                        await PopupInfor(warning, actions, Swal, Commanders)
                        break;
                    case 304:
                        actions = "info";
                        Commanders = () => resolve();
                        await PopupInfor(warning, actions, Swal, Commanders)
                        break;
                    case 500:
                        actions = "errors";
                        Commanders = () => page + "/" + response.links;
                        await PopupInfor(warning, actions, Swal, Commanders)
                        break;
                    case 503:
                        actions = "errors";
                        Commanders = () => location.reload();
                        await PopupInfor(warning, actions, Swal, Commanders)
                        break;
                    case 200:
                        if (response) {
                            switch (response.status) {
                                case 200:
                                case "200":
                                    switch (aksi) {
                                        case "reload":
                                            location.reload()
                                            break;
                                        case "next_switch":
                                            location.href = response.links
                                            break;
                                        case "next_page":
                                            actions = "success"
                                            Commanders = () =>resolve(response);
                                            await PopupInfor(warning, actions, Swal, Commanders)
                                            break;
                                        default:
                                            Swal.close();
                                            resolve();
                                            break;
                                    }
                                    break;
                                case 404:
                                    actions = "errors";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(warning, actions, Swal, Commanders)
                                    break;
                                case 204:
                                    actions = "warning";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(warning, actions, Swal, Commanders)
                                    break;
                                case 304:
                                    actions = "info";
                                    Commanders = () => resolve(response);
                                    await PopupInfor(warning, actions, Swal, Commanders)
                                    break;
                                case 500:
                                    actions = "errors";
                                    Commanders = () => page + "/" + response.links;
                                    await PopupInfor(warning, actions, Swal, Commanders)
                                    break;
                                case 503:
                                    actions = "errors";
                                    Commanders = () => location.reload();
                                    await PopupInfor(warning, actions, Swal, Commanders)
                                    break;
                            }

                        }

                        break;
                    default:
                        Swal.close()
                        resolve();
                        break;
                }
            },
            error: async (jqXHR, textStatus, errorThrown) => {
                let warning = `Error occurred: ${textStatus}`;
                let actions = "errors";
                let Commanders = () => resolve();
                await PopupInfor(warning, actions, Swal, Commanders);
            },
        })
    })
}

function hidemodal() {
    const modals = ".viewModal";
    $(modals).addClass('hidden');
    $(modals).html('');
}

async  function  PopupInfor(warning, actions, Swal, Commander) {
     return new Promise((resolve) => {
    pesan(warning, actions, Swal).then(() => {
        Swal.close();  // Menutup SweetAlert setelah popup ditutup
        // Jika Commander tidak null, jalankan fungsi tersebut
       if (typeof Commander === "function") {
                Commander();
            }
            resolve();
    });
    });
}