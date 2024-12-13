export function style() {
    customize()

}

function customize() {

    $(".readonly").keydown(function (e) {
        e.preventDefault();
    });
    $(".readonly").on("cut", function (e) {
        e.preventDefault();
    });
    $(".readonly").on("paste", function (e) {
        e.preventDefault();
    });
    $("input").attr("autocomplete", "off");
    $("img").attr("lazy", "loading");
    $(document).on("keyup", "input[type=email]", function () {
        let a = $(this).val().replace(/[^a-zA-Z0-9_.@]+/, "");
        $(this).val(a);
    });
    $(document).on("keyup", ".scan", function () {
        let a = $(this).val().replace(/[^a-zA-Z0-9._@-]/g, "");
        $(this).val(a);
    });
    $(document).on("keyup", ".nama", function () {
        let a = $(this).val().replace(/[^a-zA-Z0-9. _-]/g, "");
        $(this).val(a);
    });
    $(document).on("keyup", "input[type=tel]", function () {
        let a = $(this).val().replace(/[^0-9]+/, "");
        $(this).val(a);
    });
    $(document).on("keyup", ".nik", function () {
        let a = $(this).val().replace(/[^0-9]/g, "");
        $(this).val(a);
    });
    $(document).on("keyup", ".rupiah", function () {
        let a = $(this).val().replace(/[^0-9]/g, "");
        const ax = rupiah(a)
        $(this).val(ax);
    });

    $(document).on("click", ".pass", function (e) {
        e.preventDefault();
        var type = $("input[name=password]").attr("type");
        // now test it's value
        if (type === "password") {
            $(this).addClass("bxs-lock-open");
            $(this).removeClass("bxs-lock");
            $("input[name=password]").attr("type", "text");
        } else {
            $(this).removeClass("bxs-lock-open");
            $(this).addClass("bxs-lock");
            $("input[name=password]").attr("type", "password");
        }
    });
}


export const rupiah = (data) => {
    const number = parseInt(data, 10) || 0;
    const rupiahx = new Intl.NumberFormat("id", {
        style: "decimal",
        maximumFractionDigits: 0
    }).format(number)
    return rupiahx
}