README v0.1 / 04 APRIL 2016

# Thr0w URL

## Introduction

The Thr0w Project is about building inexpensive and manageable interactive
(or not) video walls using commodity hardware, web technologies, and open
source software. The key to this solution is having one computer behind each
screen networked to a single computer acting as a server. With this design,
the splitting and synchronization of content is accomplished through software.

This repository provides the project's *Thr0w URL* Chrome extension for the
project's required Thr0w Server implementation available at:

https://github.com/larkintuckerllc/thr0w-server

The Chrome extension allows one to remotely control the browser's
location.

## Installation

Search for *Thr0w URL* extension in the Chrome Web Store

https://chrome.google.com/webstore/

and add it to Chrome.

Click on the Thr0w URL's browser action (the icon with the *T*) and
complete and submit the form with:

* *Base*: The base URI of the Thr0w Server, e.g., *http://localhost*.
* *Username*: The username, e.g., *admin*.
* *Password*: The password configured in the Thr0w Server.
* *Channel*: A unique integer (>= 0); not used in any other extension
or Thr0w application connected to the Thr0w Server.

Restart Chrome Browser.

## USAGE

Using one of the Thr0w APIs:

* Thr0w (Client) API: <https://github.com/larkintuckerllc/thr0w-client>
* Thr0w (Node.js) API: <https://github.com/larkintuckerllc/thr0w-api>

send (*thr0w*) data to the *Thr0w URL* extension's channel as follows:

**Update**

This command directs the browser to the specified URL.

```
{
  "action": "update",
  "url": "http://www.cnn.com"
}
```

**Control**

This command directs the browser to a page that lists the open tabs; providing
a back and close button for them.

```
{
  "action": "control"
}
```

## Contributing

TODO

## Credits

TODO

## Contact

General questions and comments can be directed to
<mailto:john@larkintuckerllc.com>.

## License

This project is licensed under GNU General Public License.
