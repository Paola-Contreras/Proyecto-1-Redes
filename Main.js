const { xml, client } = require('@xmpp/client');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Configure the XMPP connection
const xmpp = client({
  service: 'xmpp://alumchat.xyz:5222',
  domain: 'alumchat.xyz',
  username: 'gabycon20213',
  password: '12345',

  tls: {
    rejectUnauthorized: true,
  }
});
xmpp.start().catch(console.error);
xmpp.on('stanza', (stanza) => {console.log(stanza.toString())
    if (stanza.is('message') && stanza.attrs.type == 'chat') {
        const from = stanza.attrs.from
        const body = stanza.getChildText('body')
        console.log(`> ${from}: ${body}`)
    }
})

xmpp.on('online', async (address) => {
  const online_stanza = xml('presence', { type: 'online' })
  xmpp.send(online_stanza)
})