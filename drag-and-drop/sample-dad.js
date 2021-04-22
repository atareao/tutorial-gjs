#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0'
const {Gtk, GObject, GdkPixbuf, Gdk, Gio} = imports.gi;

Gtk.init(null);

var Ventana = GObject.registerClass(
    class Ventana extends Gtk.Window{
        _init(){
            super._init({
                defaultWidth: 200,
                defaultHeight: 200,
                title: "Demo de Drag and Drop"
            });
            this.connect('destroy', ()=>{
                Gtk.main_quit();
            });
            let grid = new Gtk.Grid({
                margin: 10,
                "baseline-row": Gtk.BaselinePosition.CENTER,
                "column-homogeneous": true,
                "column-spacing": 10,
                "row-homogeneous": true,
                "row-spacing": 10
            });
            this.add(grid);

            let label_origen = new Gtk.Label({label: "origen"});

            let wrap_label_origen = new Gtk.EventBox();
            wrap_label_origen.add(label_origen);

            wrap_label_origen.drag_source_set(Gdk.ModifierType.BUTTON1_MASK, [], Gdk.DragAction.COPY);
            wrap_label_origen.drag_source_add_text_targets();
            wrap_label_origen.connect("drag-data-get", (widget, context, data, info , time)=>{
                log("Begins drag");
                let inner_label = widget.get_children()[0]
                let text = inner_label.get_text();
                data.set_text(text, text.length);
            });
            grid.attach(wrap_label_origen, 0, 0, 1, 1);
            let label_destino = new Gtk.Label({
                label: "Destino"
            });
            label_destino.drag_dest_set(Gtk.DestDefaults.ALL, [], Gdk.DragAction.COPY);
            label_destino.drag_dest_add_text_targets();
            label_destino.connect("drag-data-received", (widget, context, x, y, data, info, timestamp)=>{
                widget.set_text(data.get_text());
            });
            grid.attach(label_destino, 1, 0, 1, 1);

            let file = '/usr/share/icons/gnome/256x256/categories/applications-development.png'
            let pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_size(file, 256, 256);
            let image_origen = Gtk.Image.new_from_pixbuf(pixbuf);

            let wrap_image_origen = new Gtk.EventBox();
            wrap_image_origen.add(image_origen);

            wrap_image_origen.drag_source_set(Gdk.ModifierType.BUTTON1_MASK, [], Gdk.DragAction.COPY);
            wrap_image_origen.drag_source_set_icon_pixbuf(pixbuf);
            wrap_image_origen.drag_source_add_image_targets();
            wrap_image_origen.connect("drag-data-get", (widget, context, data, info, time)=>{
                let image = widget.get_children()[0];
                data.set_pixbuf(image.get_pixbuf());
            });
            grid.attach(wrap_image_origen, 0, 1, 1, 1);

            let image_destino = new Gtk.Image();

            image_destino.drag_dest_set(Gtk.DestDefaults.ALL, [], Gdk.DragAction.COPY);
            image_destino.drag_dest_add_image_targets();
            image_destino.connect("drag-data-received", (widget, context, x, y, data, info, timestamp)=>{
                widget.set_from_pixbuf(data.get_pixbuf());
            });
            grid.attach(image_destino, 1, 1, 1, 1);
        }
    }
); 

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
