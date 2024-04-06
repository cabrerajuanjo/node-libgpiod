# Development

Whenever someone needs to modify or enhance something in libgpiod, a few things
must be done to prepare the development environment for it.

## Environment setup

To consume the library all it takes is to have node and libgpiod itself, just as
described in the [README](../README.md).

To extend it, however, you need to know better the libgpiod provided by the
target platform.

### A tale of fragmentation

So far, there is at least 3 big releases to be aware of:

- [gpiod 1.4](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v1.4.x)
- [gpiod 1.6](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v1.6.x)
- [gpiod 2.0](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/log/?h=v2.0.x)

The 1.5 version introduced new functionality still present in 1.6, 1.4 can be
considered the last in the "old" libgpiod still present on many systems out
there.

The 2.0 is a brand new API with a very distinct way to work with chips and lines
and requests.

### Your openSUSE Tumbleweed daily driver might not be suitable for that work

Modern linux desktop is already shipping gpiod 2.x series, but node-libgpiod is
still under development. It might be a bit challenging proper setup the system
to compile against an older libgpiod version.

Currently my recommendation is to setup a reasonable recent linux distro with
the proper gpiod version (1.6).

I have a Fedora 38 virtual machine just for that purpose at the moment, but i am
thinking on other ways to work around this version issue.

## Testing

Proper test is another challenge.

You see, the
[example projects](https://github.com/sombriks/node-libgpiod-examples)
exists because back then i had the time and the hardware to test it, but not the
experience to write proper unit and integration tests involving this.

But if the kernel module maintainer
[wrote 100% software tests](https://git.kernel.org/pub/scm/libs/libgpiod/libgpiod.git/tree/tests/gpiod-test.c?h=v2.0.x),
so can we!

I hope so.

### Mocking and simulating

There are two tools, two kernel modules, to help us on that endeavor:
[gpio-mockup](https://docs.kernel.org/admin-guide/gpio/gpio-mockup.html) and
[gpio-sim](https://docs.kernel.org/admin-guide/gpio/gpio-sim.html).

None of them seems to be available out of the box for my outdated setup.

So [let's grab kernel sources](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tag/?h=v6.2)
and build it:

```bash
wget https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/snapshot/linux-6.2.tar.gz
tar xvfz linux-6.2.tar.gz
cd linux-6.2
make mrproper
cp /boot/config-$(uname -r) .config 
echo 'CONFIG_GPIO_MOCKUP=m' >> .config
make oldconfig
make # solve several missing dependencies
```

After compiling we can now load the new kernel module:

```bash
```

## Functionality parity

This is the api parity table:

| Function | C | Node |
| -------- | - | ---- |
