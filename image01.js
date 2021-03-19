#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject, GdkPixbuf} = imports.gi;

Gtk.init(null);

var Dialog = GObject.registerClass(
    class Dialog extends Gtk.Dialog{
        _init(){
            super._init({
                defaultWidth: 700,
                defaultHeight: 500
            });
            let layout = new Gtk.Grid({
                margin: 10,
                rowSpacing: 5,
                columnSpacing: 5
            });
            this.add_button("Aceptar", Gtk.ResponseType.OK);
            this.add_button("Cancelar", Gtk.ResponseType.CANCEL);
            this.get_content_area().add(layout);
            let image = new Gtk.Image({
                vexpand: true,
                hexpand: true,
                margin: 10,
                file: 'imagen.jpg',
                halign: Gtk.Align.CENTER,
                valign: Gtk.Align.CENTER
            });
            layout.attach(image, 0, 0, 1, 1);
            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    log(dialog.entry.get_text());
}
