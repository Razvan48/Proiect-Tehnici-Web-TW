function stergeParagraf()
{
	document.getElementById("div_paragraf").remove();

	var butoaneTrimitere = document.getElementsByClassName("buton_trimitere");

		for (var i = 0; i < butoaneTrimitere.length; i++)
			butoaneTrimitere[i].style.display = "inline-block";
}

window.onload = function()
{
	var campuriDateFormular = document.getElementsByClassName("label");
	for (var i = 0; i < campuriDateFormular.length; i++)
	{
		if (campuriDateFormular[i].for == "nume" || campuriDateFormular[i].for == "prenume")
			campuriDateFormular[i].classList.add("campPrincipal");
	}

	var dateIntrare = document.querySelectorAll("input, textarea");
	for (var i = 0; i < dateIntrare.length; i++)
	{
		if (localStorage.getItem(dateIntrare[i].id))
		{
			dateIntrare[i].value = localStorage.getItem(dateIntrare[i].id);
		}
	}
	var dateSelect = document.querySelectorAll("select");
	for (var i = 0; i < dateSelect.length; i++)
	{
		if (localStorage.getItem(dateSelect[i].id))
		{
			dateSelect[i].selectedIndex = localStorage.getItem(dateSelect[i].id);
		}
	}

	var notaSite = document.getElementById("nota_site");
	var valoareNotaSite = document.getElementById("nota_site_valoare");
	valoareNotaSite.textContent = notaSite.value;
	
	notaSite.addEventListener("input", function()
	{
		event.stopPropagation();
		valoareNotaSite.textContent = notaSite.value;
	});

	var body = document.getElementById("body");

	var divFormular = document.getElementById("div_formular");
	divFormular.style.display = "flex";
	divFormular.style.justifyContent = "center";
  	divFormular.style.alignItems = "center";
	

	var conturFormular = document.getElementsByClassName("contur_formular");

	var culori = ["yellow", "blue", "orange", "cyan"];
	culori.push("green");
	culori.push("purple");
	culori.push("black");

	for (var i = 0; i < conturFormular.length; i++)
	{
		var culoareAleatoare = culori[Math.floor(Math.random() * culori.length)];
		conturFormular[i].style.backgroundColor = culoareAleatoare;
		conturFormular[i].style.border = "5px solid black";

		if (window.getComputedStyle(conturFormular[i]).backgroundColor == "rgb(0, 0, 0)")
		{
			conturFormular[i].style.color = "white";
			conturFormular[i].style.border = "5px solid white";
			localStorage.setItem("culoareFundalFormular", "negru");
		}
		else
		{
			localStorage.setItem("culoareFundalFormular", "non-negru");
		}
	}

	body.style.backgroundColor = "gray";

	divFormular.style.backgroundColor = "gray";

	var feedback = document.getElementById("feedback");
	feedback.style.resize = "none";
	feedback.style.height = "100px";

	var campuriObligatorii = document.getElementsByClassName("required");
	
	for (var i = 0; i < campuriObligatorii.length; i++)
	{
		campuriObligatorii[i].style.fontWeight = "bold";
		campuriObligatorii[i].textContent += "*";
	}

	var dataCurenta = new Date().toISOString().split("T")[0]; ///data curenta

	var dataNastere = document.getElementById("data_nastere");
	dataNastere.setAttribute("max", dataCurenta);
	dataNastere.setAttribute("min", "1950-01-01");

	var formular = document.getElementById("formular");

	var butoane = document.getElementsByTagName("button");
	for (var i = 0; i < butoane.length; i++)
	{
		var imagineButonTrimite = document.createElement("img");
		imagineButonTrimite.src = "buttons/buton_trimite.png";
		imagineButonTrimite.alt = "Trimite";
		butoane[i].appendChild(imagineButonTrimite);
	}

	document.addEventListener("keyup", function(event)
	{
		event.stopPropagation();
		if (event.key == 'r' && event.target.nodeName !== 'INPUT')
		{
			var formulare = divFormular.querySelectorAll("form");
			for (var i = 0; i < formulare.length; i++)
			{
				formulare[i].reset();
			}
		}
	});

	formular.addEventListener("submit", function(event)
	{
		event.stopPropagation();
		event.preventDefault();

		if (document.getElementById("select_formular").value == "")
		{
			alert("Va rog alegeti o constructie preferata!");
			return;
		}

		var continutNume = document.getElementById("nume").value;
		var continutPrenume = document.getElementById("prenume").value;
		var continutDataNastere = document.getElementById("data_nastere").value;
		var continutEmail = document.getElementById("email").value;
		var continutFeedback = feedback.value;

		var divParagraf = document.createElement("div");
		divParagraf.id = "div_paragraf";

		divParagraf.style.position = "fixed";
		divParagraf.style.left = "20px";
		divParagraf.style.bottom = "20px";
		divParagraf.style.backgroundColor = "white";
		divParagraf.style.border = "5px solid black";

		var paragraf = document.createElement("p");
		paragraf.id = "paragraf";

		var selectFormular = document.getElementById("select_formular");

		paragraf.innerHTML = "Au fost introduse cu succes urmatoarele date:<br>" +
						"Nume: " + continutNume + "<br>" +
						"Prenume: " + continutPrenume + "<br>" +
						"Data Nasterii: " + continutDataNastere + "<br>" +
						"Email: " + continutEmail + "<br>" +
						"Feedback Site: " + continutFeedback + "<br>" +
						"Constructie Preferata: " + selectFormular.options[selectFormular.selectedIndex].text + "<br>";

		if (localStorage.getItem("data_trimitere_formular"))
		{
			var dataAnterioara = new Date(localStorage.getItem("data_trimitere_formular"));

			paragraf.innerHTML += "Ultima data cand a fost completat formularul: " + dataAnterioara.getDate().toString() + "-" + (dataAnterioara.getMonth() + 1).toString() + "-" + dataAnterioara.getFullYear().toString() + "<br>";
		}

		var dataCurenta = new Date();

		localStorage.setItem("data_trimitere_formular", dataCurenta);

		//localStorage.removeItem("data_trimitere_formular");

		document.body.appendChild(divParagraf);
		document.getElementById("div_paragraf").appendChild(paragraf);

		formular.reset();
		valoareNotaSite.textContent = notaSite.value;

		var butoaneTrimitere = document.getElementsByClassName("buton_trimitere");

		for (var i = 0; i < butoaneTrimitere.length; i++)
			butoaneTrimitere[i].style.display = "none";

		setTimeout(stergeParagraf, 3000);
	});

	for (var i = 0; i < dateIntrare.length; i++)
	{
		dateIntrare[i].addEventListener("input", function(event)
		{
			event.stopPropagation();

			if (event.target.value && event.target.pattern)
			{
				var regex = new RegExp(event.target.pattern);
				if (!regex.test(event.target.value))
				{
					var labelDateIntrare = document.querySelector('label[for="' + event.target.id + '"]');
					labelDateIntrare.style.color = "red";
				}
				else
				{
					var labelDateIntrare = document.querySelector('label[for="' + event.target.id + '"]');
					if (localStorage.getItem("culoareFundalFormular") == "non-negru")
						labelDateIntrare.style.color = "black";
					else
						labelDateIntrare.style.color = "white";
				}
			}
			else if (!event.target.valoare)
			{
				var labelDateIntrare = document.querySelector('label[for="' + event.target.id + '"]');
				if (localStorage.getItem("culoareFundalFormular") == "non-negru")
					labelDateIntrare.style.color = "black";
				else
					labelDateIntrare.style.color = "white";
			}
			else
			{
				var labelDateIntrare = document.querySelector('label[for="' + event.target.id + '"]');
				if (localStorage.getItem("culoareFundalFormular") == "non-negru")
					labelDateIntrare.style.color = "black";
				else
					labelDateIntrare.style.color = "white";
			}

			localStorage.setItem(event.target.id, event.target.value);
		});
	}

	for (var i = 0; i < dateSelect.length; i++)
	{
		dateSelect[i].addEventListener("change", function(event)
		{
			event.stopPropagation();
			localStorage.setItem(event.target.id, event.target.selectedIndex);
		});
	}
}

