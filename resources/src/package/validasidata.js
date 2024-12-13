import {importfile, proses_data} from "./prosesdata.js";
import {hideLoading, pesan, showLoading} from "./alert.js";
import {rupiah} from "./styles";

export async function validasidata(Swal) {
    let $form = "", url = "", aksi = "reload", uid = "", validasi = "", form = "", respon = "", data = ""
    page = page + "/";
    $(document).on("submit", ".submit", async function (e) {
        e.preventDefault()
        $form = $(this)
        data = $form.data("aksi")
        form = $form.serialize()
        switch (data) {
            case "login":
                await showLoading(Swal)
                url = page + "login"
                aksi = "next_page"
                respon = await proses_data(form, url, aksi, Swal);
                if (respon.status) {
                    console.log(respon)
                    location.href = page + respon.links
                    await hideLoading(Swal)
                }else {
                    await hideLoading(Swal)
                }
                break;

        }
    })
}