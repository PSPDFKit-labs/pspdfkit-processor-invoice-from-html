## Creating invoice from HTML with PSPDFKit Processor

This is a small project in Node.js which creates invoices from an HTML template using [PSPDFKit Processor](https://pspdfkit.com/server/processor/pdf-generation/).

See the accompanying blog post at https://pspdfkit.com/blog/2021/creating-invoices-from-html-with-pspdfkit-processor/.

### How-to

Written with Node.js 14.7.0. To use it, clone the repository and run:

```bash
npm install
```

Then start the Processor. If you have a license key, run:

```sh
docker run --rm -p 5000:5000 -e LICENSE_KEY=YOUR_LICENSE_KEY_GOES_HERE pspdfkit/processor
```

And if you don't, you can start the Processor in trial mode with:

```sh
docker run --rm -p 5000:5000 pspdfkit/processor
```

After that, you can create the invoice by running `node generate.js` - the resulting PDF file will be saved at `./invoice.pdf`.

### Credits

- [Inter](https://github.com/rsms/inter) font family by The Inter Project Authors.
