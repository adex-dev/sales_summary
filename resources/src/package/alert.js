export async function pesan(warning, actions, Swal) {
    const modal = ".modal"
    switch (actions) {
        case "error":
        case "info":
        case "warning":
        case "success":
            return Swal.fire({
                html: warning, icon: actions, customClass: {
                    container: 'swal2-container-custom'
                }, showCancelButton: false, allowOutsideClick: false, allowEscapeKey: false, target: $(modal).get(0),
            });
            break;
        case "question":
              return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            customClass: {
                container: 'swal2-container-custom'
            },
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            target: $(modal).get(0),
        });
              break;
        default:
            return Swal.fire({
                html: "Unknown Action", icon: 'warning', customClass: {
                    container: 'swal2-container-custom'
                }, showCancelButton: false, allowOutsideClick: false, allowEscapeKey: false, target: $(modal).get(0),
            });
            break;
    }
}

export async function hideLoading(Swal) {
    Swal.close()
}

export async function showLoading(Swal) {
    Swal.fire({
        title: "Loading..",
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        target: document.querySelector(".viewModal"),
        didOpen: () => {
            Swal.showLoading()
        }
    })
}