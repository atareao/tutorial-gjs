

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject} = imports.gi;

Gtk.init(null);

var Dialog = GObject.registerClass(
    class Dialog extends Gtk.Dialog{
        _init(){
            super._init({
                defaultWidth:200,
                defaultHeight: 200
            });
            let layout = new Gtk.Grid({
                margin: 10,
                rowSpacing: 5,
                columnSpacing: 5
            });
            this.add_button("Aceptar", Gtk.ResponseType.OK);
            this.add_button("Cancelar", Gtk.ResponseType.CANCEL);
            this.get_content_area().add(layout);
            layout.attach(new Gtk.Label({
                label: "Nombre:"
            }), 0, 0, 1, 1);
            this.buffer = new Gtk.TextBuffer({
                    text: "Este es un texto mas largo",
                });
            this.entry = new Gtk.TextView({
                buffer: this.buffer,
                editable: true,
                justification: Gtk.Justification.CENTER,
                leftMargin: 10,
                rightMargin: 10,
                pixelsAboveLines: 10,
                pixelsBelowLines: 10
            });
            this.buffer.connect('changed', (tb)=>{
                let inicio = tb.get_start_iter();
                let fin = tb.get_end_iter();
                print(tb.get_text(inicio, fin, false));
            });
            layout.attach(this.entry, 0, 1, 1, 1);

            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    let inicio = dialog.buffer.get_start_iter();
    let fin = dialog.buffer.get_end_iter();
    log(dialog.buffer.get_text(inicio, fin, false));
}
