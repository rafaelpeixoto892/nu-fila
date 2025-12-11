"use strict";

window.handleSubscription = async function (dataDetail, elementId) {

    let elementNewsletterCard = document.getElementById(elementId);

    let emailExists = await verifyExistsEmailNewsletter(dataDetail.email);
    if (emailExists) {
        console.log("Email já existe, não é necessário salvar novamente. " + emailExists);
        elementNewsletterCard.isSubscribed = true;
        elementNewsletterCard.hasError = true;
        elementNewsletterCard.spinnerScreen = false;
        return;
    }

    let endpoint = blogConfig?.urlApi + '/users/subscribe';
    let data = {
      email: dataDetail.email,
      name: dataDetail.nome,
      user_ip: '127.0.0.1',
    };
    elementNewsletterCard.spinnerScreen = true;
    setTimeout(() => {
      jQuery.ajax({
        url: endpoint,
        type: 'POST',
        data: data,
        success: function(response) {
          //console.log("Resposta do servidor da API:", response);
          saveEmailNewsletter(dataDetail);
          elementNewsletterCard.isSubscribed = true;
        },
        error: function(error) {
          console.error("Erro ao enviar:", error);
          elementNewsletterCard.isSubscribed = false;
          elementNewsletterCard.hasError = true;
        },
        complete: function() {
          elementNewsletterCard.spinnerScreen = false;
        }
      });
      
    }, 1000);
}

window.handleSubscriptionFooter = async function (dataDetail, elementId) {

    let elementNewsletterFooter = document.getElementById(elementId);

    elementNewsletterFooter.spinnerScreen = true;

    let emailExists = await verifyExistsEmailNewsletter(dataDetail.email);
    if (emailExists) {
        console.log("Email já existe, não é necessário salvar novamente. " + emailExists);
        elementNewsletterFooter.statusRequest = 'registeredEmail';
        elementNewsletterFooter.spinnerScreen = false;
        return;
    }

    let endpoint = blogConfig?.urlApi + '/users/subscribe';
    let data = {
      email: dataDetail.email,
      name: dataDetail.nome,
      user_ip: '127.0.0.1',
    };

    setTimeout(() => {

        jQuery.ajax({
          url: endpoint,
          type: 'POST',
          data: data,
          success: function(response) {
        
            console.log("Resposta do servidor da API:", response);

            saveEmailNewsletter(dataDetail);
        
            elementNewsletterFooter.statusRequest = 'sucess';

        },
        error: function(error) {
            console.error("Erro ao enviar:", error);
            elementNewsletterFooter.statusRequest = 'error';
        },
        complete: function() {
            elementNewsletterFooter.spinnerScreen = false;
            console.log("Requisição finalizada");
        }
        });
        
    }, 1000);

}

async function verifyExistsEmailNewsletter(email) {

  let emailExists = false;

  try {
    console.log('Verificando se o email já existe na API /users/getsubscribersfile');
    const response = await jQuery.ajax({
      url: blogConfig?.urlApi + `/users/getsubscribersfile?email=${encodeURIComponent(email)}`,
      method: 'GET',
      dataType: 'json',
    });

    //console.log('Dados recebidos:', response);

    emailExists = response.exists;

  } catch (error) {
    console.error('Erro API /users/subscribersfile: ', error);
    return false;
  }

  return emailExists;
}

async function saveEmailNewsletter(dataDetail) {

  const endpoint = blogConfig?.urlApi + '/users/subscribersfile';

  try {
    await jQuery.post(endpoint, { email: dataDetail.email, name: dataDetail.nome });

  } catch (error) {
    console.error('Erro ao salvar o email na API /subscribersfile:', error);
  }

}