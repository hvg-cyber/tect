/*
********** How to setup a working environment **********

(1) Enable virtualization via BIOS
(2) Download and install VirtualBox
(3) Download a Debian .iso and install it inside VirtualBox
(4) Set up a shared folder

********** Enable sudo **********

$ su -
$ usermod -aG sudo vboxuser
$ adduser vboxuser sudo


********** How to manually set up a shared folder **********

Inside guest OS (Windows):
(1) Create a new folder. Let's call it 'sysprog'
(2) In VirtualBox, right click on Debian and select Settings
(3) Select Common Folders
(4) Add the newly created folder into global folders.

Inside guest OS (Debian):
# check what folders we have right now
$ ls -la /mnt
$ sudo mkdir /mnt/shared
$ sudo mount -t vboxsf sysprog /mnt/shared
$ ls -la /mnt
$ cd /mnt/shared

********** Shared folder **********

How to set up a shared folder with cron (not working):
$ echo 'sudo mount -t vboxsf sysprog /mnt/shared' > startup.sh
$ chmod -x startup.sh
$ crontab -e
Write "@reboot ~/startup.sh" at the bottom of the editor
Ctrl (left) + S
Ctrl (left) + X

Temporary workaround:
# make sure you are in your home directory
$ cd
# create a script (once)
$ echo 'sudo mount -t vboxsf sysprog /mnt/shared' > startup.sh
# run a script
$ bash startup.sh


*/