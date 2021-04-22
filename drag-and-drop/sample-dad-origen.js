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
            grid.attach(label_origen, 0, 0, 1, 1);

            let label_destino = new Gtk.Label({label: "Destino"});
            grid.attach(label_destino, 1, 0, 1, 1);

            let file = '/usr/share/icons/gnome/256x256/categories/applications-development.png'
            let pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_size(file, 256, 256);
            let image_origen = Gtk.Image.new_from_pixbuf(pixbuf);
            grid.attach(image_origen, 0, 1, 1, 1);

            let image_destino = new Gtk.Image();
            grid.attach(image_destino, 1, 1, 1, 1);
        }
    }
); 

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
