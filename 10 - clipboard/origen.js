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

            let entry_text = new Gtk.Entry();
            grid.attach(entry_text, 0, 0, 1, 1);

            let button_copy_text = new Gtk.Button({label: "Copiar texto"});
            grid.attach(button_copy_text, 2, 0, 1, 1);

            let button_paste_text = new Gtk.Button({label: "Pegar texto"});
            grid.attach(button_paste_text, 3, 0, 1, 1);

            let file = '/usr/share/icons/gnome/256x256/categories/applications-development.png'
            let pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_size(file, 32, 32);
            let entry_image = Gtk.Image.new_from_pixbuf(pixbuf);
            grid.attach(entry_image, 0, 1, 1, 1);

            let button_copy_image = new Gtk.Button({label: "Copiar imagen"});
            grid.attach(button_copy_image, 2, 1, 1, 1);

            let button_paste_image = new Gtk.Button({label: "Pegar imagen"});
            grid.attach(button_paste_image, 3, 1, 1, 1);
        }
    }
); 

let ventana = new Ventana();
ventana.show_all();

Gtk.main();
