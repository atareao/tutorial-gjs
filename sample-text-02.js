#!/usr/bin/env gjs

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
            this.entry = new Gtk.Entry({
                text: "Lorenzo",
                editable: true,
                maxLength: 5,
                visibility: false,
                widthChars: 255,
                placeholderText: "Introduce tu nombre",
                xalign: 0.5,
                primaryIconTooltipText: "Borrar el contenido",
                primaryIconStock: Gtk.STOCK_DELETE,
                //secondaryIconStock: Gtk.STOCK_DELETE
            });
            this.entry.connect("icon-release", (widget, pos)=>{
                if(pos == 0){
                    this.entry.set_text("");
                }
            });
            layout.attach(this.entry, 1, 0, 1, 1);

            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    log(dialog.entry.get_text());
}
