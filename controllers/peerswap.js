//This controller houses all the peerswap functions

//Function # 1
//Invoke the 'peerswap-reloadpolicy' command to reload the policy file
/**
* @swagger
* /peerswap/reloadPolicy:
*   get:
*     tags:
*       - Peerswap
*     name: reloadpolicy
*     summary: Reloads the policy file
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Fetch policy successfully
*         schema:
*           type: object
*           properties:
*             ReserveOnchainMsat:
*               type: integer
*               description: reserved onchain mSats
*             PeerAllowlist:
*               type: array
*               items:
*                   type: string
*               description: allowed peers list
*             AcceptAllPeers:
*               type: boolean
*               description: accept all peers
*       500:
*         description: Server error
*/
exports.reloadPolicy = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapReloadpolicy().then(policy => {
        global.logger.log('peerswap reload policy success');
        res.status(200).json(policy);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 2
//Invoke the 'peerswap-getswap' command for returning swap by swapid
//Arguments - swapId [required]
/**
* @swagger
* /peerswap/swap:
*   get:
*     tags:
*       - Peerswap
*     name: getSwap
*     summary: Gets swap details by swap id
*     parameters:
*       - in: route
*         name: swapId
*         description: swap id
*         type: string
*         required:
*           - swapId
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Fetch swap details successfully
*         schema:
*           type: object
*           properties:
*             swap_id:
*               type: string
*               description: swap id
*             data:
*               type: object
*               description: data related to swap id
*             type:
*               type: integer
*               description: type
*             role:
*               type: integer
*               description: role
*             previous:
*               type: string
*               description: previous state of swap
*             current:
*               type: string
*               description: current state of swap
*       500:
*         description: Server error
*/
exports.getSwap = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapGetswap(req.params.swapId).then(swap => {
        global.logger.log('peerswap get swap success');
        res.status(200).json(swap);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 3
//Invoke the 'peerswap-listswaps' command to list all swaps
/**
* @swagger
* /peerswap/listSwaps:
*   get:
*     tags:
*       - Peerswap
*     name: listswaps
*     summary: Gets the list all peerswaps
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: An array of swaps objects is returned
*         schema:
*           type: array
*           items:
*               type: object
*               properties:
*                   id:
*                     type: string
*                     description: swap id
*                   asset:
*                     type: string
*                     description: asset
*                   created_at:
*                     type: string
*                     description: create at
*                   type:
*                     type: string
*                     description: type
*                   role:
*                     type: string
*                     description: role
*                   state:
*                     type: string
*                     description: current state of swap
*                   initiator_node_id:
*                     type: string
*                     description: initiator node id
*                   peer_node_id:
*                     type: string
*                     description: peer node id
*                   amount:
*                     type: integer
*                     description: amount to swap
*                   short_channel_id:
*                     type: string
*                     description: short channel id
*                   opening_tx_id:
*                     type: string
*                     description: opening transaction id
*                   claim_tx_id:
*                     type: string
*                     description: claim transaction id
*       500:
*         description: Server error
*/
exports.listSwaps = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapListswaps().then(swaps => {
        global.logger.log('peerswap list swaps success');
        res.status(200).json(swaps);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 4
//Invoke the 'peerswap-listactiveswaps' command for returning list of active swaps
/**
* @swagger
* /peerswap/listActiveSwaps:
*   get:
*     tags:
*       - Peerswap
*     name: listactiveswaps
*     summary: Gets the list of active swaps
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Fetch list of active swaps successfully
*         schema:
*           type: array
*           items:
*               type: object
*               properties:
*                   swap_id:
*                       type: string
*                       description: swap id
*                   data:
*                       type: object
*                       description: data related to swap id
*                   type:
*                      type: integer
*                      description: type
*                   role:
*                     type: integer
*                     description: role
*                   previous:
*                     type: string
*                     description: previous state of swap
*                   current:
*                     type: string
*                     description: current state of swap
*       500:
*         description: Server error
*/
exports.listActiveSwaps = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapListactiveswaps().then(activeSwaps => {
        global.logger.log('peerswap list active swaps success');
        res.status(200).json(activeSwaps);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 5
//Invoke the 'peerswap-listswaprequests' command for fetching list of unhandled swaps requested by peer nodes
/**
* @swagger
* /peerswap/listSwapRequests:
*   get:
*     tags:
*       - Peerswap
*     name: listswaprequests
*     summary: Gets the list of unhandled swaps requested by peer nodes
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Fetch list of list of unhandled swaps requested by peer nodes successfully
*         schema:
*           type: array
*           items:
*               type: object
*               properties:
*                   node_id:
*                       type: string
*                       description: node id
*                   requests:
*                       type: object
*                       description: unhandled requests by peer nodes
*       500:
*         description: Server error
*/
exports.listSwapRequests = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapListswaprequests().then(swapRequests => {
        global.logger.log('peerswap list swap requests success');
        res.status(200).json(swapRequests);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 6
//Invoke the 'peerswap-listpeers' command for returning the list of peers supporting the peerswap
/**
* @swagger
* /peerswap/listPeers:
*   get:
*     tags:
*       - Peerswap
*     name: listpeers
*     summary: Gets the list of peers supporting the peerswap
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Fetch list of peers supporting peerswap successfully
*         schema:
*           type: array
*           items:
*               type: object
*               properties:
*                   nodeid:
*                       type: string
*                       description: node id
*                   swaps_allowed:
*                       type: boolean
*                       description: swaps allowed
*                   supported_assets:
*                       type: array
*                       items:
*                           type: string
*                       description: supported assets
*                   channels:
*                       type: array
*                       items:
*                           type: object
*                           properties:
*                               short_channel_id:
*                                   type: string
*                                   description: channel id
*                               local_balance:
*                                   type: integer
*                                   description: local balance
*                               remote_balance:
*                                   type: integer
*                                   description: remote balance
*                               local_percentage:
*                                   type: integer
*                                   description: local percentage
*                               state:
*                                   type: string
*                                   description: channel state
*                       description: channels
*                   sent:
*                       type: object
*                       properties:
*                           total_swaps_out:
*                               type: integer
*                               description: total number of swap out
*                           total_swaps_in:
*                               type: integer
*                               description: total number of swap in
*                           total_sats_swapped_out:
*                               type: integer
*                               description: total sats swapped out
*                           total_sats_swapped_in:
*                               type: integer
*                               description: total sats swapped in
*                       description: sent details
*                   received:
*                       type: object
*                       properties:
*                           total_swaps_out:
*                               type: integer
*                               description: total number of swap out
*                           total_swaps_in:
*                               type: integer
*                               description: total number of swap in
*                           total_sats_swapped_out:
*                               type: integer
*                               description: total sats swapped out
*                           total_sats_swapped_in:
*                               type: integer
*                               description: total sats swapped in
*                       description: received details
*                   total_fee_paid:
*                       type: integer
*                       description: total paid fee
*       500:
*         description: Server error
*/
exports.listPeers = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapListpeers().then(peers => {
        global.logger.log('peerswap list peers success');
        res.status(200).json(peers);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 7
//Invoke the 'peerswap-allowswaprequests' command for setting peerswap to allow incoming swap requests
/**
* @swagger
* /peerswap/allowSwapRequests:
*   get:
*     tags:
*       - Peerswap
*     name: allowswaprequests
*     summary: Sets peerswap to allow incoming swap requests
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Allow or deny incoming swap requests successfully
*         schema:
*           type: string
*           description: response message to allow or deny incoming swaps 
*       500:
*         description: Server error
*/
exports.allowSwapRequests = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapAllowswaprequests(req.params.isAllowed).then(allowRes => {
        global.logger.log('peerswap allow swap requests success');
        res.status(200).json(allowRes);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 8
//Invoke the 'peerswap-addpeer' command to add peer to allowlist
/**
* @swagger
* /peerswap/addPeer:
*   get:
*     tags:
*       - Peerswap
*     name: addpeer
*     summary: Add peer to allowlist
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Adds peer to allowed list successfully
*         schema:
*           type: object
*           properties:
*             ReserveOnchainMsat:
*               type: integer
*               description: reserved onchain mSats
*             PeerAllowlist:
*               type: array
*               items:
*                   type: string
*               description: allowed peers list
*             AcceptAllPeers:
*               type: boolean
*               description: accept all peers
*       500:
*         description: Server error
*/
exports.addPeer = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapAddpeer(req.params.pubkey).then(addPeerRes => {
        global.logger.log('peerswap add peer success');
        res.status(200).json(addPeerRes);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 9
//Invoke the 'peerswap-removepeer' command to remove peer from allowlist
/**
* @swagger
* /peerswap/removePeer:
*   get:
*     tags:
*       - Peerswap
*     name: removepeer
*     summary: Remove peer from allowlist
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Removes peer from allowed list successfully
*         schema:
*           type: object
*           properties:
*             ReserveOnchainMsat:
*               type: integer
*               description: reserved onchain mSats
*             PeerAllowlist:
*               type: array
*               items:
*                   type: string
*               description: allowed peers list
*             AcceptAllPeers:
*               type: boolean
*               description: accept all peers
*       500:
*         description: Server error
*/
exports.removePeer = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapRemovepeer(req.params.pubkey).then(removePeerRes => {
        global.logger.log('peerswap remove peer success');
        res.status(200).json(removePeerRes);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 10
//Invoke the 'peerswap-resendmsg' command for resending last swap message
/**
* @swagger
* /peerswap/resendMessage:
*   get:
*     tags:
*       - Peerswap
*     name: resendmsg
*     summary: Command to resend last swap message
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Resend last swap message successfully
*         schema:
*           type: boolean
*           description: true if resend successful
*       500:
*         description: Server error
*/
exports.resendMessage = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapResendmsg(req.params.swapId).then(resendmsgRes => {
        global.logger.log('peerswap resend message success');
        res.status(200).json(true);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 11
//Invoke the 'peerswap-swapin' command to swap in
/**
* @swagger
* /peerswap/swapIn:
*   post:
*     tags:
*       - Peerswap
*     name: swapin
*     summary: Swaps in
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: amountSats
*         description: Amount in milli satoshis
*         type: integer
*         required:
*           - amountSats
*       - in: body
*         name: shortChannelId
*         description: Short Channel ID
*         type: string
*         required:
*           - shortChannelId
*       - in: body
*         name: asset
*         description: Asset
*         type: string
*         required:
*           - asset
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Initiates the request to swap in
*         schema:
*           type: object
*           properties:
*               id:
*                 type: string
*                 description: swap id
*               asset:
*                 type: string
*                 description: asset
*               created_at:
*                 type: string
*                 description: create at
*               type:
*                 type: string
*                 description: type
*               role:
*                 type: string
*                 description: role
*               state:
*                 type: string
*                 description: current state of swap
*               initiator_node_id:
*                 type: string
*                 description: initiator node id
*               peer_node_id:
*                 type: string
*                 description: peer node id
*               amount:
*                 type: integer
*                 description: amount to swap
*               short_channel_id:
*                 type: string
*                 description: short channel id
*               opening_tx_id:
*                 type: string
*                 description: opening transaction id
*       500:
*         description: Server error
*/
exports.swapIn = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapSwapIn(
        amt_sat=req.body.amountSats,
        short_channel_id=req.body.shortChannelId,
        asset=req.body.asset
    ).then(swapInRes => {
        global.logger.log('peerswap swap in success');
        res.status(200).json(swapInRes);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}

//Function # 12
//Invoke the 'peerswap-swapout' command to swap out
/**
* @swagger
* /peerswap/swapOut:
*   post:
*     tags:
*       - Peerswap
*     name: swapout
*     summary: Swaps out
*     consumes:
*       - application/json
*     parameters:
*       - in: body
*         name: amountSats
*         description: Amount in milli satoshis
*         type: integer
*         required:
*           - amountSats
*       - in: body
*         name: shortChannelId
*         description: Short Channel ID
*         type: string
*         required:
*           - shortChannelId
*       - in: body
*         name: asset
*         description: Asset
*         type: string
*         required:
*           - asset
*     security:
*       - MacaroonAuth: []
*     responses:
*       200:
*         description: Initiates the request to swap out
*         schema:
*           type: object
*           properties:
*               id:
*                 type: string
*                 description: swap id
*               asset:
*                 type: string
*                 description: asset
*               created_at:
*                 type: string
*                 description: create at
*               type:
*                 type: string
*                 description: type
*               role:
*                 type: string
*                 description: role
*               state:
*                 type: string
*                 description: current state of swap
*               initiator_node_id:
*                 type: string
*                 description: initiator node id
*               peer_node_id:
*                 type: string
*                 description: peer node id
*               amount:
*                 type: integer
*                 description: amount to swap
*               short_channel_id:
*                 type: string
*                 description: short channel id
*               opening_tx_id:
*                 type: string
*                 description: opening transaction id
*       500:
*         description: Server error
*/
exports.swapOut = (req,res) => {
    function connFailed(err) { throw err }
    ln.on('error', connFailed);

    ln.peerswapSwapOut(
        amt_sat=req.body.amountSats,
        short_channel_id=req.body.shortChannelId,
        asset=req.body.asset
    ).then(swapOutRes => {
        global.logger.log('peerswap swap out success');
        res.status(200).json(swapOutRes);
    }).catch(err => {
        global.logger.warn(err);
        res.status(500).json({error: err});
    });
    ln.removeListener('error', connFailed);
}
