describe('Model :: User', function() {

  var mockData = { name: 'Foo Bar' };

  beforeEach(function() {
    var that = this,
        done = false;

    require(['app/namespace','app/models/UserModel','app/collections/UsersCollection'], function(namespace, UserModel ,UsersCollection) {
        that.users = new UsersCollection();
        that.user = new UserModel();
         done = true;
    });

    waitsFor(function() {
      return done;
    }, "Create Models");

  });

  afterEach(function(){
    var done = false,
        isDone = function(){ return done; };

    this.users.fetch({
      success: function(c) {
        c.each(function(m){
          m.destroy();
        });
        done = true;
      }
    });

    waitsFor(isDone);

    done = false;
    this.user.destroy({
      success: function(){
        done = true;
      }
    });
    
    waitsFor(isDone);

  });

  describe('.Create()', function() {

    it('should create a user', function() {
      var done = false;
      var usr = this.users.create(mockData, {
        success: function() {
          done = true;
        }
      });

      waitsFor(function() { return done; });

      runs(function(){
        expect(usr).not.toBe(null);
        //expect(usr.get('completed')).toEqual(false);
        expect(usr.get('name')).toEqual('Foo Bar');
        // expect(usr.get('timestamp')).toEqual(jasmine.any(Number));
        expect(usr.id).toEqual(jasmine.any(String));
      });

    });
    /*
    it('should fail creating a title-less todo', function() {
      var spy = jasmine.createSpy();
      this.todo.on('error', spy);
      this.todo.save({});
      expect(spy.callCount).toEqual(1);
      expect(this.todo.id).toBeUndefined();
    });
    */
  });

  describe('.Read()', function() {
    it('should read models from collection', function() {
      var done = false,
          spy = jasmine.createSpy();
          users = this.users;

      users.on('reset', spy);
      this.users.on('sync', spy);


      this.todo.on('sync', function(){
        expect(users.size()).toEqual(0);
        expect(users.callCount).toEqual(1);

        users.reset();

        expect(users.size()).toEqual(0);
        expect(spy.callCount).toEqual(2);

        users.fetch({
          success: function(){
            expect(users.size()).toEqual(1);
            expect(spy.callCount).toEqual(3);
            done = true;
          }
        });

      }, this);

      this.todo.save(mockData);


      waitsFor(function() { return done; });

    });

    it('should have proper remaining and completed methods', function() {

      var completedMock = _.extend({completed: true}, mockData);
      this.todos.add([mockData,mockData,mockData,completedMock]);

      expect(this.todos.remaining().length).toEqual(3);
      expect(this.todos.completed().length).toEqual(1);

      this.todos.remaining()[0].set({completed: true});
        
      expect(this.todos.remaining().length).toEqual(2);
      expect(this.todos.completed().length).toEqual(2);

    });
  });


});