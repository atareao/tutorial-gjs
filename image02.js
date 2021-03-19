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
            let pixbuf = GdkPixbuf.Pixbuf.new_from_file('imagen.jpg');
            let image = new Gtk.Image({
                vexpand: true,
                hexpand: true,
                margin: 10,
                pixbuf: pixbuf,
                halign: Gtk.Align.CENTER,
                valign: Gtk.Align.CENTER
            });
            image = Gtk.Image.new_from_file('imagen.jpg');
            layout.attach(image, 0, 0, 1, 1);
            let button = new Gtk.Button({
                label: "Voltear"
            });
            button.connect("clicked", ()=>{
                let pb = image.get_pixbuf();
                image.set_from_pixbuf(pb.flip(false));
            });
            layout.attach(button, 0, 1, 1, 1);
            let button2 = new Gtk.Button({
                label: "Rotar"
            });
            button2.connect("clicked", ()=>{
                let pb = image.get_pixbuf();
                image.set_from_pixbuf(pb.rotate_simple(GdkPixbuf.PixbufRotation.COUNTERCLOCKWISE));
            });
            layout.attach(button2, 1, 1, 1, 1);
            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    log(dialog.entry.get_text());
}
