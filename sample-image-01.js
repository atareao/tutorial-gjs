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
            this.image = new Gtk.Image();
            layout.attach(this.image, 1, 0, 1, 1);

            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    log("Clic ok");
}
