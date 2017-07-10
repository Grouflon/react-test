import React from 'react';
import PropTypes from 'prop-types';

class Books extends React.Component
{
	constructor()
	{
		super();
		this.state =
		{
			books: []
		};
	}

	onBookAdded(book)
	{
		var books = this.state.books.concat([book]);
		this.setState(
		{
			books: books
		});
	}

	onBookChanged(index, book)
	{
		var books = this.state.books.concat();
		books[index] = book; 

		this.setState(
		{
			books: books
		});
	}

	onBookRemoved(index)
	{
		var books = this.state.books.concat();
		books.splice(index, 1);
		this.setState(
		{
			books: books
		});
	}

	render()
	{
		var i = 0;
		var books = this.state.books.map(function(book)
		{
			var index = i++;
			return (
				<Book
					key={index}
					title={book.title}
					read={book.read}
					onChange={(book) => this.onBookChanged(index, book)}
					onRemove={() => this.onBookRemoved(index)}
				/>
			);
		}.bind(this));

		return (
			<div>
				<BookForm onBookAdded={(book) => this.onBookAdded(book)}/>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Read</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{books}
					</tbody>
				</table>
			</div>
		);
	}
}

class Book extends React.Component
{
	onReadChange()
	{
		this.props.onChange(
		{
			title: this.props.title,
			read: !this.props.read
		});
	}

	onTitleChange(ev)
	{
		this.props.onChange(
		{
			title: ev.target.value,
			read: this.props.read
		});
	}

	render()
	{
		return (
			<tr>
				<td><input type='text' value={this.props.title} onChange={(ev) => this.onTitleChange(ev)}/></td>
				<td><input type='checkbox' checked={this.props.read} onChange={() => this.onReadChange()}/></td>
				<td><button onClick={() => this.props.onRemove()}>Remove</button></td>
			</tr>
		);
	}
}

Book.propTypes = 
{
	title: PropTypes.string.isRequired
};

Book.defaultProps =
{
	title: 'unnamed'
};

class BookForm extends React.Component
{
	constructor()
	{
		super();
		this.state =
		{
			title: '',
			read: false
		};
	}

	changeTitle(ev)
	{
		this.setState(
			{
				title: ev.target.value
			}
		);
	}

	changeRead(ev)
	{
		this.setState(
		{
			read: !this.state.read
		});
	}

	addBook(ev)
	{
		ev.preventDefault();

		this.props.onBookAdded(
		{
			title: this.state.title,
			read: this.state.read
		});

		this.setState(
		{
			title: '',
			read: false
		});
	}

	render()
	{
		return (
			<form onSubmit={(ev) => this.addBook(ev)}>
				<div>
					<label htmlFor='title'>Title</label>
					<input type='text' id='title' value={this.state.title} onChange={(ev) => this.changeTitle(ev)} placeholder='Title' />
				</div>
				<div>
					<label htmlFor='read'>Read</label>
					<input type='checkbox' id='read' checked={this.state.read} onChange={(ev) => this.changeRead(ev)} placeholder='Title' />
				</div>
				<div>
					<button type='submit'>Add Book</button>
				</div>
			</form>
		);
	}
};

BookForm.propTypes =
{
	onBookAdded: React.PropTypes.func.isRequired
};

class App extends React.Component
{
	render()
	{
		return (
			<Books/>
		);
	}
}

export default App
