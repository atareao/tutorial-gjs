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
            let model = new Gtk.TreeStore();
            model.set_column_types([
                GObject.TYPE_STRING,
                GObject.TYPE_FLOAT
            ]);
            let iter = model.append(null);
            model.set(iter, [0, 1], ["Especial", 0.9]);
            model.set(model.append(null), [0, 1], ["Peras", 2.0]);
            model.set(model.insert(iter, null), [0, 1], ["Melones", 2.5]);
            model.set(model.append(null), [0, 1], ["Melocotones", 1.3]);

            let bold = new Gtk.CellRendererText({
                weight: Pango.Weight.BOLD
            });
            let normal = new Gtk.CellRendererText({
                weight: Pango.Weight.LIGHT
            });

            let column0 = new Gtk.TreeViewColumn({
                title: "Fruta"
            });
            let column1 = new Gtk.TreeViewColumn({
                title: "Precio"
            });
            column0.pack_start(bold, true);
            column0.add_attribute(bold, "text", 0);
            column1.pack_start(normal, true);
            column1.add_attribute(normal, "text", 1);

            this.treeView = new Gtk.TreeView({
                model: model
            });
            this.treeView.insert_column(column0, 0);
            this.treeView.insert_column(column1, 1);

            layout.attach(this.treeView, 1, 0, 1, 1);
            this.show_all();
        }
    }
);

let dialog = new Dialog();
if (dialog.run() == Gtk.ResponseType.OK){
    let selected = dialog.treeView.get_selection();
    let [isSelected, model, iter] = selected.get_selected();
    log(model.get_value(iter, 0));
}
