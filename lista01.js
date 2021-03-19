#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject, GdkPixbuf, Pango} = imports.gi;

Gtk.init(null);

var Dialog = GObject.registerClass(
    class Dialog extends Gtk.Dialog{
        _init(){
            super._init({
                defaultWidth: 200,
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
            let label = new Gtk.Label({
                label: "Elige"
            });
            layout.attach(label, 0, 0, 1, 1);
            let model = new Gtk.ListStore();
            model.set_column_types([
                GObject.TYPE_STRING,
                GObject.TYPE_FLOAT
            ]);
            model.set(model.append(), [0, 1], ["Peras", 2.0]);
            model.set(model.append(), [0, 1], ["Melones", 3.4]);
            model.set(model.append(), [0, 1], ["Melocotones", 1.5]);

            let bold = new Gtk.CellRendererText({
                weight: Pango.Weight.BOLD
            });
            let normal = new Gtk.CellRendererText({
                weight: Pango.Weight.LIGHT
            });

            this.combo = new Gtk.ComboBox({
                model: model,
                active: 0
            });
            this.combo.pack_start(bold, true);
            this.combo.add_attribute(bold, "text", 0);
            this.combo.pack_start(normal, true);
            this.combo.add_attribute(normal, "text", 1);

            layout.attach(this.combo, 1, 0, 1, 1);
            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    let model = dialog.combo.get_model();
    let selected = dialog.combo.get_active_iter()[1];
    log(model.get_value(selected, 0));
}
