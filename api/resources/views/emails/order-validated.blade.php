@component('mail::message', ['to' => $to[0]['address']])
<div class="u-row-container" style="padding: 0px;background-color: transparent">
   <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e8eced;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
         <!--[if (mso)|(IE)]>
         <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
               <td style="padding: 0px;background-color: transparent;" align="center">
                  <table cellpadding="0" cellspacing="0" border="0" style="width:600px;">
                     <tr style="background-color: #e8eced;">
                        <![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600" style="background-color: #fcfcfc;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                           <![endif]-->
                           <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="background-color: #fcfcfc;width: 100% !important;">
                                 <!--[if (!mso)&(!IE)]><!-->
                                 <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                    <!--<![endif]-->
                                    <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:44px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                                   <tbody>
                                                      <tr>
                                                         <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                                                            <img src="{{asset('images/panier.png')}}" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 26%;max-width: 150.8px;" width="150.8" border="0" align="middle">
                                                         </td>
                                                      </tr>
                                                   </tbody>
                                                </table>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
                                                <div class="v-text-align" style="color: #34495e; line-height: 140%; text-align: center; word-wrap: break-word;">
                                                   <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 26px; line-height: 36.4px;"><strong><span style="line-height: 36.4px; font-size: 26px;">Votre paiement a bien été pris en compte</span></strong></span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 33px;font-family:'Montserrat',sans-serif;" align="left">
                                                <div class="v-text-align" style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                                                   <p style="font-size: 14px; line-height: 210%;">&nbsp;</p>
                                                   <p style="font-size: 14px; line-height: 210%;">
                                                      Le paiement pour votre commande {{$ref}} à bien été prise en compte.
                                                      <br>Nous vous informerons quand la commande sera expédiée.
                                                   </p>
                                                   <p style="font-size: 14px; line-height: 210%;">Nous espérons de tout coeur que votre commande vous plaira.</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px 44px;font-family:'Montserrat',sans-serif;" align="left">
                                                <div class="v-text-align" align="center">
                                                   <!--[if mso]>
                                                   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;">
                                                      <tr>
                                                         <td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center">
                                                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://click-games.fr/" style="height:49px; v-text-anchor:middle; width:231px;" arcsize="8%" stroke="f" fillcolor="#ffb200">
                                                               <w:anchorlock/>
                                                               <center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;">
                                                                  <![endif]-->
                                                                  <a href="https://click-games.fr/orders/{{$ref}}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ffb200; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                                                  <span style="display:block;padding:15px 33px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">Voir ma commande</span></strong></span></span>
                                                                  </a>
                                                                  <!--[if mso]>
                                                               </center>
                                                            </v:roundrect>
                                                         </td>
                                                      </tr>
                                                   </table>
                                                   <![endif]-->
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <!--[if (!mso)&(!IE)]><!-->
                                 </div>
                                 <!--<![endif]-->
                              </div>
                           </div>
                           <!--[if (mso)|(IE)]>
                        </td>
                        <![endif]-->
                        <!--[if (mso)|(IE)]>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
         <![endif]-->
      </div>
   </div>
</div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
   <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
         <!--[if (mso)|(IE)]>
         <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
               <td style="padding: 0px;background-color: transparent;" align="center">
                  <table cellpadding="0" cellspacing="0" border="0" style="width:600px;">
                     <tr style="background-color: #ffffff;">
                        <![endif]-->
                        <!--[if (mso)|(IE)]>
                        <td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top">
                           <![endif]-->
                           <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                 <!--[if (!mso)&(!IE)]><!-->
                                 <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                    <!--<![endif]-->
                                    <table style="font-family:'Montserrat',sans-serif;" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                       <tbody>
                                          <tr>
                                             <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 33px 10px;font-family:'Montserrat',sans-serif;" align="left">
                                                <div class="v-text-align" style="color: #686d6d; line-height: 210%; text-align: center; word-wrap: break-word;">
                                                   <p style="font-size: 14px; line-height: 210%;">(Note : Veuillez patienter 24 heures pour que les informations soient mises à jour sur le site du transporteur.)</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <!--[if (!mso)&(!IE)]><!-->
                                 </div>
                                 <!--<![endif]-->
                              </div>
                           </div>
                           <!--[if (mso)|(IE)]>
                        </td>
                        <![endif]-->
                        <!--[if (mso)|(IE)]>
                     </tr>
                  </table>
               </td>
            </tr>
         </table>
         <![endif]-->
      </div>
   </div>
</div> 
@endcomponent
