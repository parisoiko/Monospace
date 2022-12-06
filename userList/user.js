var generalViewModel = function() {
    var self = this;
    self.users = ko.observableArray();

    self.init = function() {
        $.ajax({
            type: 'GET',
            url: 'https://paris.users.challenge.dev.monospacelabs.com/users',
            dataType: 'json',
            async: 'false',
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    self.users.push(new userViewModel(data[i], self.change));
                }
            }
        });
    }

    self.usersSelected = ko.computed(function() {
        var x = 0;
        for (var i = 0; i < self.users().length; i++) {
            if (self.users()[i].selected() === true) {
                x++;
            }
        }
        return x;
    })

    self.change = function(user) {
        var parameters = {
            "id": user.id(), 
            "name": user.name(),
            "email": user.email(),
            "phone": user.phone(),
            "active": user.active(),
            "type": user.type()
        }
        $.ajax({
            type: 'PUT',
            url: 'https://paris.users.challenge.dev.monospacelabs.com/users' + '/' + user.id(),
            dataType: 'json',
            async: 'false',
            data: ko.toJSON(parameters)/*ko.toJSON(user)*/,
            success: function(data) {

            }
        });
    }
}

var userViewModel = function(user, onChange) {
    var self = this;
    self.id = ko.observable(user.id);
    self.selected = ko.observable(); //checkbox
    self.type = ko.observable(user.type);
    self.name = ko.observable(user.name);
    self.email = ko.observable(user.email);
    self.phone = ko.observable(user.phone);
    self.active = ko.observable(user.active); //status

    self.onChangeDelegate = onChange;

    self.changeUser = function() {
        self.onChangeDelegate(self);
    }

    self.typeBox = ko.computed(function() {
        return self.type().substring(0, 2).toUpperCase();
    });
    self.bgColor = ko.computed(function() {
        if (self.type() === 'Supervisor') {
            return 'red';
        } else if (self.type() === 'Stakeholder') {
            return 'blue';
        } else if (self.type() === 'Employee') {
            return 'cyan';
        } else if (self.type() === 'Guest') {
            return 'green';
        }
    });
}